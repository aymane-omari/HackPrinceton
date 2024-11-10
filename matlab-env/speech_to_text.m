% Full Script to Convert Speech from .wav to Text

% Step 1: Specify the path to your .wav audio file
filePath = 'Iliketurtule.wav'; % Ensure this file is in the same directory or provide the full path

% Step 2: Load the .wav audio file
try
    [audioData, fs] = audioread(filePath);
    disp('Audio file loaded successfully.');
catch ME
    error('Error loading audio file: %s', ME.message);
end

% Display basic information about the audio file
disp(['Sampling Rate: ', num2str(fs), ' Hz']);
disp(['Audio Duration: ', num2str(length(audioData) / fs), ' seconds']);

% Step 3: Ensure the audio data is of type 'double'
if ~isa(audioData, 'double')
    audioData = double(audioData);
end

% Step 4: Convert stereo to mono if necessary
if size(audioData, 2) == 2
    audioData = mean(audioData, 2); % Convert stereo to mono
    disp('Converted stereo audio to mono.');
end

% Step 5: Create a table with the audio data and sample rate
audioTable = table({audioData}, fs, 'VariableNames', {'Audio', 'SampleRate'});

% Step 6: Initialize the Wav2Vec speech client
try
    client = speechClient("wav2vec2.0");
    disp('Wav2Vec model loaded successfully!');
catch ME
    error('Error initializing Wav2Vec model: %s', ME.message);
end

% Step 7: Convert speech to text using the Wav2Vec model
try
    recognizedText = speech2text(audioData,fs)
    disp(['Recognized Speech: ', recognizedText]);
catch ME
    error('Error during speech recognition: %s', ME.message);
end

% Step 8: Save the recognized text to a file (optional)
outputFile = 'recognized_text.txt';
fid = fopen(outputFile, 'w');
fprintf(fid, '%s\n', recognizedText);
fclose(fid);
disp(['Text saved to ', fullfile(pwd, outputFile)]);
