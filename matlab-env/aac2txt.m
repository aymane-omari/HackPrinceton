% Full Script to Convert Speech from .wav to Text
function recognizedText = transcribe(filePath)
    % Step 1: Specify the path to your .wav audio file
    % filePath = 'input.wav'; % Ensure this file is in the same directory or provide the full path
    
    % Step 2: Load the .wav audio file

    [audioData, fs] = audioread(filePath);
    disp('Audio file loaded successfully.');

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

    client = speechClient("wav2vec2.0");
    disp('Wav2Vec model loaded successfully!');
    
    % Step 7: Convert speech to text using the Wav2Vec model
    recognizedText = speech2text(audioData,fs)
    disp(['Recognized Speech: ', recognizedText]);
end