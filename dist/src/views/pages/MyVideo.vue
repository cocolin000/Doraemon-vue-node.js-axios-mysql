<template>
    <div class="container" ref="container">
      <video
        class="htmlVideo"
        ref="videoPlayer"
        autoplay
        :id="`videos-${index}`"
        @ended="handleVideoEnded"
        @loadedmetadata="onLoadedMetadata"
        crossOrigin="anonymous"
      >
    <source         :src="source"/>
    </video>
      <div v-show="showOverlay" class="overlay" @click="togglePlay">
        <div class="triangle"></div>
      </div>
      <div
      v-if="recording"
        style="
          position: absolute;
          left: 45%;
          width: 12%;
          height: 5%;
          background-color: #161616;
          display: flex;
          justify-content: center;
          top: 3%;
          pointer-events: none;
        "
      >
        <!-- 录制小红点 -->
        <div
        v-if="recording"
          style="
            width: 10px;
            height: 10px;
            margin-top: 3px;
            background-color: red;
            border-radius: 50%;
          "
        ></div>
        <!-- 计时器 -->
        <div
        v-if="recording"
          style="color: white; margin-left: 5px; font-size: 10px; margin-top: 3px;"
        >
          {{ recordingTimeReader }}
        </div>
        <img
        v-if="recording"
          :src="stopIcon"
          alt="start Icon"
          style="margin-left: 7px;"
        />
      </div>
      <canvas
        style="display: none; width: 200px; height: 200px"
        id="myCanvas"
      ></canvas>
      <div class="console">
        <div class="loadingSpeed">{{ loadingSpeed }}</div>
        <div class="right-controls">
          <div class="volume-control" @mouseenter="showSlider = true" @mouseleave="showSlider = false">
            <img
              class="resized-img"
              :src="isMuted ? closeIcon : upIcon"
              alt="Play/Pause Icon"
              @click="toggleMute"
            />
            <div class="slider-container" v-show="showSlider">
              <input type="range" min="0" max="100" v-model="volume" @input="updateVolume" class="volume-slider" />
            </div>
            <div class="volume-display">{{ volume }}</div>
          </div>
          <!-- 截图按钮 -->
          <div class="screenShot">
            <img
              class="resized-img"
              src="@/assets/logo.png"
              alt="Icon"
              @click="screenShot"
            />
          </div>
          <!-- 录制视频 -->
          <div class="downloadLink">
            <img
            class="resized-img"
              :src="recording ? stopIcon : startIcon"
              alt="start/stop Icon"
              @click="toggleRecording"
            />
          </div>
          <!-- 播放/暂停 -->
          <div class="playPause">
            <img
              class="resized-img"
              :src="isPlaying ? pauseIcon : playIcon"
              alt="Play/Pause Icon"
              @click="togglePlay"
            />
          </div>
          <!-- 全屏播放 -->
          <div class="custom-controls">
            <img
              class="resized-img"
              src="@/assets/logo.png"
              alt="Icon"
              @click="toggleFullscreen"
            />
          </div>
          <!-- 关闭播放器 -->
          <div class="custom-controls">
            <img class="resized-img" src="@/assets/logo.png" alt="Icon" @click="videoOut" />
          </div>
        </div>
      </div>
    </div>
  </template>
   
  <script>
  import html2canvas from "html2canvas";
  import RecordRTC from "recordrtc";
/*   var playButton = document.querySelector(".custom-controls button");
  var seekRange = document.getElementById("seekRange");
  var currentTimeDisplay = document.getElementById("currentTime");
  var durationDisplay = document.getElementById("duration"); */
  export default {
    props: {
      source: {
        type: String,
        // default:"https://media.w3.org/2010/05/sintel/trailer.mp4",
        default: "http://localhost:8989/media/out/software/films/cn_universDevelop_2021.mp4",
        required: true,
      },
      videoObj: {
        type: Array,
      },
      selectIndex: {
        type: Number,
        default: 0,
      },
      playArray: {
        type: Array,
      },
      index: {
        type: Number,
        default: 0,
      },
    },
    data() {
      return {
        showOverlay: false,
        playIcon: require("@/assets/logo.png"),
        pauseIcon: require("@/assets/logo.png"),
        startIcon: require("@/assets/logo.png"),
        stopIcon: require("@/assets/logo.png"),
        upIcon: require("@/assets/logo.png"),
        closeIcon: require("@/assets/logo.png"),
        isPlaying: true,
        videoElement: null,
        videoUrl: "",
        loadingSpeed: null,
        isMuted: false,
        volume: 100,
        showSlider: false,
        speed: "1",
        duration: 0,
        timerId: null,
        currentTime: 0,
        isRecording: false,
        recordedChunks: [],
        recording: false,
        recordingTime: 0,
        recordingTimeReader: "00:00:00",
        recorder: null,
      };
    },
    mounted() {
      const video = this.$refs.videoPlayer;
      this.videoElement = this.$refs.videoPlayer;
      video.addEventListener("progress", this.updateLoadingSpeed);
    },
    unmounted() {
     
    },
    beforeUnmount() {
      clearInterval(this.timerId);
      const video = this.$refs.videoPlayer;
      video.removeEventListener("progress", this.updateLoadingSpeed);
    },
    methods: {
      // 录制
      toggleRecording() {
        if (this.recording) {
          // 结束录制
          this.recording = false;
          clearInterval(this.timer);
          this.recorder.stopRecording(() => {
            const blob = this.recorder.getBlob();
            const url = URL.createObjectURL(blob);
            // 获取下载地址
            this.videoUrl = url;
            // 创建隐藏的 <a> 标签
            const link = document.createElement("a");
            link.style.display = "none";
            link.href = this.videoUrl;
            link.download = "录屏.webm";
            // 将 <a> 标签添加到 DOM 中
            document.body.appendChild(link);
            // 触发点击事件
            link.click();
            // 删除 <a> 标签
            document.body.removeChild(link);
          });
        } else {
          // 开始录制
          this.startRecording();
        }
      },
      // 开始录制
      startRecording() {
        this.recording = true;
        this.recordingTime = 0;
        this.videoUrl = "";
        // 获取视频元素
        const videoElement = document.getElementById(`videos-${this.index}`);
        // 使用 RecordRTC 创建录制器
        const stream = videoElement.captureStream();
        this.recorder = RecordRTC(stream, {
          type: "video",
        });
        this.recorder.startRecording();
        // 更新录制时长
        this.timer = setInterval(() => {
          this.recordingTime++;
          this.recordingTimeReader = this.formatTime(this.recordingTime);
        }, 1000);
      },
      // 录制专用的时间计时器
      formatTime(time) {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = Math.floor(time % 60);
   
        const formattedHours = this.padZero(hours);
        const formattedMinutes = this.padZero(minutes);
        const formattedSeconds = this.padZero(seconds);
   
        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
      },
      padZero(num) {
        return num.toString().padStart(2, "0");
      },
      // 录制意外中断（视频到头，拖动时间轴，自选时间等）
      recordingStop() {
        this.recording = false
        this.recordingTimeReader = "00:00:00"
      },
      // 截图
      screenShot() {
        let video = document.getElementById(`videos-${this.index}`);
        // let canvas = document.getElementById("myCanvas");
        html2canvas(video, {
          allowTaint: true,
          useCORS: true,
        }).then((canvas) => {
          // base64
          const capture = canvas.toDataURL("image/png");
          const saveInfo = {
            download: "截屏" + ".png",
            href: capture,
          };
          const element = document.createElement("a");
          element.style.display = "none";
          for (const key in saveInfo) {
            element.setAttribute(key, saveInfo[key]);
          }
          document.body.appendChild(element);
          element.click();
          setTimeout(() => {
            document.body.removeChild(element);
          }, 300);
        });
      },
      // video计时器
      onLoadedMetadata() {
        const videoElement = this.$refs.videoPlayer;
        this.duration = Math.floor(videoElement.duration * 1000);
   
        // 使用定时器每秒更新当前播放时间
        this.timerId = setInterval(() => {
          this.currentTime = Math.floor(videoElement.currentTime);
          this.$emit("timeUpdate", this.index, this.currentTime);
        }, 1000);
      },
      // 视频播放结束
      handleVideoEnded() {
        console.log("timeUpdateList", this.playArray);
        this.$emit("timeUpdateList", this.playArray[this.selectIndex]);
        this.recordingStop()
      },
      // 视频播放倍速
      changePlaybackRate(date) {
        if (date == "x2") {
          this.speed = "2";
        } else if (date == "x4") {
          this.speed = "4";
        } else if (date == "x8") {
          this.speed = "8";
        }
        const videoElement = this.$refs.videoPlayer;
        videoElement.playbackRate = parseFloat(this.speed);
      },
      // 设置移动时间轴起播事件
      initVideoPlayer(currentTime) {
        // alert(currentTime)
        console.log(currentTime);
        const video = this.$refs.videoPlayer;
        video.addEventListener("loadedmetadata", () => {
          video.currentTime = currentTime;
          // 开始播放视频
          video.play();
        });
      },
      // 播放/暂停
      togglePlay() {
        if (this.isPlaying) {
          this.videoElement.pause();
          this.showOverlay = true;
        } else {
          this.videoElement.play();
          this.showOverlay = false;
        }
        this.isPlaying = !this.isPlaying;
      },
      PlayIcon() {
        if (this.isPlaying) {
          this.videoElement.pause();
          this.showOverlay = true;
        }
        this.isPlaying = !this.isPlaying;
      },
      pause() {
        if (!this.isPlaying) {
          this.videoElement.play();
          this.showOverlay = false;
        }
        this.isPlaying = !this.isPlaying;
      },
      // 全屏
      toggleFullscreen() {
        const video = document.getElementById(`videos-${this.index}`);
   
        if (video.requestFullscreen) {
          video.requestFullscreen();
        } else if (video.mozRequestFullScreen) {
          video.mozRequestFullScreen();
        } else if (video.webkitRequestFullscreen) {
          video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) {
          video.msRequestFullscreen();
        }
      },
      // 静音非静音
      toggleMute() {
        if (this.isMuted) {
          this.isMuted = false;
        } else {
          this.isMuted = true;
        }
      },
      // 音量调节
      updateVolume() {
        if (!this.isMuted) {
          // 更新video标签的音量
          this.$refs.videoPlayer.volume = this.volume / 100;
        }
      },
      // 退出播放
      videoOut() {
        console.log(this.videoObj);
        console.log(this.selectIndex);
        const index = this.selectIndex;
        this.$set(this.videoObj, index, {
          ...this.videoObj[index],
          playUrl: "",
          index,
          rate: 1,
          playS: 0,
          data: [],
          channelId: "",
          deviceId: "",
          streamId: "",
        });
        this.$emit("videoObj", this.videoObj);
      },
      // 计算缓冲速度
      updateLoadingSpeed() {
        const video = document.getElementById(`videos-${this.index}`);
        const progressEvent = video.buffered.end(0); // 获取已缓冲的时间范围结束点
   
        if (progressEvent > 0) {
          const duration = video.duration; // 获取音频总时长
          const loadedPercentage = (progressEvent / duration) * 100; // 计算已缓冲的百分比
          console.log(loadedPercentage);
          const loadingSpeed =
            Math.round((progressEvent / video.currentTime) * 1000) / 1000; // 计算加载速度（已缓冲时段的大小除以当前播放位置的时间）
          // 如果加载速率趋于无穷，则显示为0kb
          if (loadingSpeed * 8 > 1000000) {
            this.loadingSpeed = `0 KB/S`;
          } else {
            this.loadingSpeed = `${(loadingSpeed * 8).toFixed(2)} KB/S`;
          }
        }
      },
      clearLoadingSpeed() {
        this.loadingSpeed = null;
      },
    },
  };
  </script>
   
   <style scoped lang="scss">
   .container {
     width: 100%;
     height: 100%;
     background-color: #000;
     padding-bottom: 46.25%;
     position: relative;
     display: flex;
     flex-direction: column;
    z-index: 10000;
     .htmlVideo {
       width: 100%;
       /* 视频元素宽度设置为100%以填充容器 */
       height: 91%;
       /* 视频元素高度设置为100%以填充容器 */
       position: absolute;
       /* 设置绝对定位，使其覆盖容器 */
       top: 0;
       left: 0;
       object-fit: fill;
     }
   }
    
   .console {
     bottom: -7px;
     height: 11%;
     width: 100%;
     position: absolute;
     // justify-content: center;
     /* 垂直居中 */
     display: flex;
     // flex-direction: column;
     background-color: #161616;
    
     .loadingSpeed {
       justify-content: center;
       /* 垂直居中 */
       font-size: 14px;
       margin-left: -3%;
       width: 20%;
       display: flex;
       margin-top: 10px;
     }
    
     .right-controls {
       position: absolute;
       right: 0;
       display: flex;
       margin-top: 10px;
     }
    
     .volume-control {
       position: relative;
       display: inline-block;
       margin-left: 20px;
     }
    
     .volume-icon {
       background: transparent;
       border: none;
       font-size: 24px;
       cursor: pointer;
       outline: none;
     }
    
     .slider-container {
       // position: absolute;
       top: 50%;
       left: -10px;
       // transform: rotate(90deg) translateY(-50%);
       width: 100px;
       height: 150px;
       background-color: #f1f1f1;
       border-radius: 10px;
       z-index: 9999;
       opacity: 0;
       transition: opacity 0.2s ease;
     }
    
     .volume-slider {
       position: absolute;
       top: 5px;
       left: 50%;
       transform: translateX(-50%);
       width: 80%;
     }
    
     .volume-display {
       position: absolute;
       top: 50%;
       left: 45px;
       transform: translateY(-50%);
       color: #000;
       font-size: 12px;
     }
    
     .volume-control:hover .slider-container {
       opacity: 1;
     }
    
     .screenShot {
       width: 80%;
       margin-right: 14px;
     }
    
     .downloadLink {
       width: 80%;
       margin-right: 10px;
     }
    
     .playPause {
       margin-top: 1px;
       width: 80%;
       margin-right: 10px;
     }
    
     .custom-controls {
       width: 80%;
       margin-right: 10px;
     }
    
     .volume-control {
       width: 80%;
       margin-right: 10px;
       // margin-top: -4px;
     }
   }
   .resized-img {
     transform: scale(0.8);
   }
   .overlay {
     position: absolute;
     top: 0;
     left: 0;
     width: 100%;
     height: 100%;
     background-color: rgba(0, 0, 0, 0.5);
     display: flex;
     align-items: center;
     justify-content: center;
     z-index: 1;
   }
   .triangle {
     width: 0;
     height: 0;
     border-left: 30px solid transparent;
     border-right: 30px solid transparent;
     border-bottom: 48px solid white;
     transform: rotate(90deg);
   }
    
   .play-button {
     position: absolute;
     top: 10px;
     left: 10px;
   }
   </style>