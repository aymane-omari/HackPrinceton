import { View, Button, Text, StyleSheet, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import ColorList from "../components/ColorList";
import AudioRecorderPlayer from "react-native-audio-recorder-player";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";

const audioRecorderPlayer = new AudioRecorderPlayer();

const AudioRecorder = () => {
	const [recording, setRecording] = useState(null);
	const [recordingStatus, setRecordingStatus] = useState("idle");
	const [audioPermission, setAudioPermission] = useState(false);

	useEffect(() => {
		// Get permission when component mounts
		getPermission();
		// Cleanup when unmounting
		return () => {
			if (recording) {
				stopRecording();
			}
		};
	}, []);

	// Get permission for audio recording
	const getPermission = async () => {
		try {
			const { granted } = await Audio.requestPermissionsAsync();
			setAudioPermission(granted);

			if (!granted) {
				Alert.alert(
					"Permissions required",
					"Audio recording needs microphone permission."
				);
			}

			// Set audio mode
			await Audio.setAudioModeAsync({
				allowsRecordingIOS: true,
				playsInSilentModeIOS: true,
			});
		} catch (error) {
			console.error("Failed to get permission:", error);
		}
	};

	// Start recording
	const startRecording = async () => {
		try {
			if (!audioPermission) {
				Alert.alert("Permission needed", "Please grant microphone permission");
				return;
			}

			// Create recording instance
			const newRecording = new Audio.Recording();

			// Prepare recording
			await newRecording.prepareToRecordAsync(
				Audio.RecordingOptionsPresets.HIGH_QUALITY
			);

			// Start recording
			await newRecording.startAsync();

			setRecording(newRecording);
			setRecordingStatus("recording");
		} catch (error) {
			console.error("Failed to start recording:", error);
			Alert.alert("Error", "Failed to start recording");
		}
	};

	// Stop recording and upload
	const stopRecording = async () => {
		try {
			if (!recording) {
				return;
			}

			// Stop recording
			await recording.stopAndUnloadAsync();

			// Get recording URI
			let uri = recording.getURI();
			// uri = "file:/" + recording.getURI().slice(10);

			console.log(uri);

			// Create form data for upload
			const formData = new FormData();
			formData.append("audio", {
				uri: uri,
				type: "audio/aac",
				name: "recording.aac",
			});

			// Upload the recording
			const response = await fetch("http://10.29.154.28:8080/transcribe", {
				method: "POST",
				// headers: {
				// 	"Content-Type": "multipart/form-data",
				// },
				body: formData,
			});

			const data = await response.json();
			console.log("Upload response:", data);

			// Reset recording state
			setRecording(null);
			setRecordingStatus("stopped");
		} catch (error) {
			console.error("Failed to stop recording:", error);
			Alert.alert("Error", "Failed to stop recording");
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.status}>Status: {recordingStatus}</Text>

			{recordingStatus === "idle" || recordingStatus === "stopped" ? (
				<Button
					title="Start Recording"
					onPress={startRecording}
					disabled={!audioPermission}
				/>
			) : (
				<Button title="Stop Recording" onPress={stopRecording} color="red" />
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
	},
	status: {
		fontSize: 18,
		marginBottom: 20,
	},
});

export default AudioRecorder;

// const Home = () => {
// 	const [recording, setRecording] = useState(false);
// 	const [permissionResponse, requestPermission] = Audio.usePermissions();

// 	async function startRecording() {
// 		try {
// 			if (permissionResponse.status !== "granted") {
// 				console.log("Requesting permission..");
// 				await requestPermission();
// 			}
// 			await Audio.setAudioModeAsync({
// 				allowsRecordingIOS: true,
// 				playsInSilentModeIOS: true,
// 			});

// 			console.log("Starting recording..");
// 			const { recording } = await Audio.Recording.createAsync(
// 				Audio.RecordingOptionsPresets.HIGH_QUALITY
// 			);
// 			setRecording(recording);
// 			console.log("Recording started");
// 		} catch (err) {
// 			console.error("Failed to start recording", err);
// 		}
// 	}

// 	async function stopRecording() {
// 		console.log("Stopping recording..");
// 		setRecording(undefined);
// 		await recording.stopAndUnloadAsync();
// 		await Audio.setAudioModeAsync({
// 			allowsRecordingIOS: false,
// 		});
// 		const result = recording.getURI();

// 		const formData = new FormData();
// 		formData.append("audio", {
// 			uri: result,
// 			type: "audio/aac",
// 			name: "recording.aac",
// 		});

// 		fetch("http://10.29.154.28:8080/transcribe", {
// 			method: "POST",
// 			// headers: {
// 			// 	"Content-Type": "multipart/form-data",
// 			// },
// 			body: formData,
// 		})
// 			.then((response) => response.json())
// 			.then((data) => console.log("File uploaded successfully:", data))
// 			.catch((error) => console.error("Error uploading file:", error));
// 	}

// 	return (
// 		<View>
// 			<Button
// 				title={recording ? "Stop Recording" : "Start Recording"}
// 				onPress={recording ? stopRecording : startRecording}
// 			/>
// 		</View>
// 	);
// };

// export default Home;
