% Test if the Wav2Vec model is available
try
    client = speechClient("wav2vec2.0");
    disp('Wav2Vec model loaded successfully!');
catch ME
    disp('Error loading model:');
    disp(ME.message);
end
