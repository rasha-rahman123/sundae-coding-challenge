import Head from "next/head";
import React, { useEffect, useState, useRef } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Registration } from "../components/Form";
import { useAppContext } from "../context/state";
import * as Tone from "tone";
import WaveSurfer from "wavesurfer.js";
export default function Editor() {
  const [audio, setAudio] = useState<AudioBuffer>();
  const [player, setPlayer] = useState<Tone.Player>();
  const [distortion, setDistortion] = useState<number>(0.0);
  const [rev, setRev] = useState<number>(0.01);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [low, setLow] = useState<number>(0);
  const [mid, setMid] = useState<number>(0);
  const [high, setHigh] = useState<number>(0);
  const [bob, setBob] = useState<Blob>();
  const [time, setTime] = useState<number>(0);
  const [wavesurfer, setWaveSurfer] = useState<WaveSurfer>();
  var dist, reverb, eq, vol;
  useEffect(() => {
    if (audio) {
      var play = new Tone.Player({
        url: audio,
        loop: false,
        autostart: false,
      }).toDestination();
      setPlayer(play);
    }
  }, [audio]);
  const waveformRef = useRef();
  useEffect(() => {
    if (waveformRef.current && audio && bob) {
      const j = WaveSurfer.create({
        container: waveformRef.current,
        barWidth: 3,
        cursorWidth: 1,
        backend: "WebAudio",
        height: 80,
        progressColor: "#2D5BFF",
        responsive: true,
        waveColor: "#EFEFEF",
        cursorColor: "transparent",
        mediaControls: false,
        interact: false
      });
      setWaveSurfer(j);
    }
  }, [audio, bob]);

  useEffect(() => {
    if (wavesurfer) {
      wavesurfer.loadBlob(bob);
      wavesurfer.setMute(true);
    }
  }, [wavesurfer]);

  useEffect(() => {
    
    wavesurfer && wavesurfer.on('seek', function (a) {
      
  });
  })

  useEffect(() => {
    if (audio) {
      Tone.loaded().then(() => {
        dist = new Tone.Distortion(distortion).toDestination();
        reverb = new Tone.Reverb(rev).toDestination();
        eq = new Tone.EQ3({
          low: low,
          mid: mid,
          high: high,
          lowFrequency: 300,
          highFrequency: 9000,
        }).toDestination();
      });
    }
  });
  const handlePlay = () => {
    Tone.loaded().then(() => {
      player.disconnect();
      player.stop();
      player.connect(dist);
      player.connect(reverb);
      player.connect(eq);
      player.connect(new Tone.Volume(-20).toDestination());
      player.fadeIn = 1;
      player.start();
      setIsPlaying(true);
      player.seek(time);
      wavesurfer && wavesurfer.play(time);
    });
  };
  const handleStop = () => {
    Tone.loaded().then(() => {
      player.fadeOut = 1;
      player.disconnect();
      player.stop();
      wavesurfer && wavesurfer.stop();
      setIsPlaying(false);
    });
  };

  const handlePause = () => {
    setTime(player.now());
    const j = setTimeout(() => time > 0 && handleStop(), 600);
    j;
  };

  useEffect(() => {
    const j = setTimeout(() => time > 0 && handlePlay(), 500);
    j;
  }, [time]);

  const handleDrop = (e: File) => {
    var reader = new FileReader();
    reader.onload = readSuc;
    var audioCtx = new AudioContext();
    function readSuc(evt) {
      audioCtx.decodeAudioData(evt.target.result).then((buffer) => {
        setAudio(buffer);
        setBob(e);
      });
    }
    reader.readAsArrayBuffer(e);
  };
  return (
    <>
      <div className="container">
        <Head>
          <title>Sundae Coding Challenge - Rasha Rahman - Editor</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <div className="main">
          <h1>Editor</h1>
          {audio ? (
            <>
              <h6>Now Editing</h6>
              <h4>Edit your audio below</h4>
            </>
          ) : (
            <>
              {" "}
              <h4>Please upload a new file</h4>
              <div
                className="dropBox"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                
                  if (!e.dataTransfer.files[0].type.includes("audio")) {
                    alert("Audio Files Only");
                    return;
                  }
                  handleDrop(e.dataTransfer.files[0]);
                }}
              >
                <h3>Drag and Drop Audio Here</h3>
                <label htmlFor="files" className="btn">
                  Or Click To Upload
                </label>
                <input
                  onChange={(e) => handleDrop(e.target.files[0])}
                  type="file"
                  className="fileLoader"
                  accept=".mp3,audio/*"
                />
              </div>
            </>
          )}
          {audio && <div ref={waveformRef}></div>}
          {audio && (
            <div className="playControl">
              {isPlaying ? (
                <p
                  onClick={() => {
                    handlePause();
                  }}
                  style={{
                    color: isPlaying ? "yellow" : "white",
                  }}
                >
                  Pause
                </p>
              ) : (
                <p
                  onClick={() => {
                    handlePlay();
                  }}
                  style={{
                    color: isPlaying ? "lime" : "white",
                  }}
                >
                  Play
                </p>
              )}

              <p
                onClick={() => {
                  setTime(0);
                  handleStop();
                }}
                style={{
                  color: isPlaying ? "salmon" : "white",
                }}
              >
                Stop
              </p>
            </div>
          )}
          {audio && (
            <div style={{ display: "grid" }}>
              <h6>Distortion ({distortion})</h6>
              <input
                type="range"
                value={distortion * 100}
                min="0"
                max="100"
                onChange={(e) => {
                  setTime(player.now());

                  setDistortion(e.currentTarget.valueAsNumber / 100);
                }}
              />
              <h6>Reverb ({rev})</h6>
              <input
                type="range"
                value={rev}
                min="0.01"
                max="21"
                onChange={(e) => {
                  setTime(player.now());

                  setRev(e.currentTarget.valueAsNumber);
                }}
              />
              <div
                style={{ display: "grid", gridTemplateColumns: "33% 34% 33%" }}
              >
                {" "}
                <h6>Low EQ</h6>
                <h6>Mid EQ</h6>
                <h6>High EQ</h6>
              </div>
              <div
                style={{ display: "grid", gridTemplateColumns: "33% 34% 33%" }}
              >
                <input
                  type="range"
                  value={low}
                  min="-20"
                  max="20"
                  onChange={(e) => {
                    setTime(player.now());

                    setLow(e.currentTarget.valueAsNumber);
                  }}
                />

                <input
                  type="range"
                  value={mid}
                  min="-20"
                  max="20"
                  onChange={(e) => {
                    setTime(player.now());

                    setMid(e.currentTarget.valueAsNumber);
                  }}
                />

                <input
                  type="range"
                  value={high}
                  min="-20"
                  max="20"
                  onChange={(e) => {
                    setTime(player.now());

                    setHigh(e.currentTarget.valueAsNumber);
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
