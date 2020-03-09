<style lang="stylus">
  .dragCon
    position fixed
    top 40px
    left 30px
    right 30px
    bottom 30px
    border 4px solid #fff
    &.dragHover
      border 4px dotted #d8d8d8
      background-color rgba(0,0,0,0.03)
  .uploadBtn
    text-align center
    margin-top 120px
    .dragDesc
      position fixed
      bottom 10px
      width 100%
      left 0
      font-size 12px
      color #c5c5c5
  .dragResult
    margin-top 15px
    li
      padding 5px 0
      font-size 14px
      color #8a2be2
      p
        margin-bottom 0
        text-overflow ellipsis
        overflow hidden
        white-space nowrap
  
  .dragResultImage
    img
      margin-top 10px
      max-width 360px
      max-height 150px
  .dragResultDesc
    font-size 12px
    color #848282
    padding 10px 0
    margin-top 20px
  .drapDownload
    position fixed
    bottom 20px
    right 20px
    background-color #ff0000
    width 40px
    height 40px
    line-height 45px
    text-align center
    border-radius 40px
    box-shadow 0 1px 3px rgba(0,0,0,0.3)
    cursor pointer
    transition all 0.25s
    &:hover
      box-shadow 0 3px 10px rgba(0,0,0,0.5)
    .tb-icon
      color #fff
</style>

<template>
  <div class="dragCon" :class="{'dragHover': hover}" v-loader.fullscreen="compressing">
    <p class="uploadBtn" v-if="backData.name === undefined"><tb-icon :icon="getIcon()" size="110px" style="color: #8a2be2"></tb-icon><span class="dragDesc"><tb-icon icon="alert-circle-o" size="12px"></tb-icon>&nbsp;&nbsp;拖拽图片压缩</span></p>
    <div v-if="backData.name !== undefined">
      <tb-row>
        <tb-col :xs="12">
          <div id="drawing" style="width:150px;height:150px;"></div>
        </tb-col>
        <tb-col :xs="12">
          
          <ul class="dragResult">
            <li><p>{{backData.reName === undefined ? backData.name : backData.reName}}</p></li>
            <li>压缩前：{{backData.oldSize | bToKb}}</li>
            <li>压缩后：{{backData.newSize | bToKb}}</li>
          </ul>

        </tb-col>
      </tb-row>
      <div class="dragResultImage">
        <img :src="backData.filePath">
      </div>
      <p class="dragResultDesc"><tb-icon icon="alert-circle-o" size="12px"></tb-icon>&nbsp;&nbsp;拖拽文件可继续上传</p>
    </div>

    <div class="drapDownload" v-if="backData.name !== undefined" @click="downloadImg()">
      <tb-icon icon="download" size="20px"></tb-icon>
    </div>
  </div>
</template>

<script>
  const {
    ipcRenderer
  } = window.require('electron');

  import { CirclePie } from '@tbj/dk';

  export default {
    data () {
      return {
        hover: false,
        compressing: false,
        backData: {}
      }
    },

    filters: {
      bToKb (num) {
        num = parseInt(num);
        return (num / 1024).toFixed(2) + 'kb';
      }
    },

    mounted () {
      document.addEventListener('drop', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (this.compressing) {
          return;
        }
        this.clearBackData();
        this.hover = false;
        const files = e.dataTransfer.files;
        if (files.length > 1) {
          this.$Message({
            type: 'warning',
            message: '暂时只支持单文件压缩，默认压缩第一个',
            position: 'centertop'
          });
        }
        this.uploadImage(files[0])
      });

      document.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (this.compressing) {
          return;
        }
        this.clearBackData();
        this.hover = true;
      }, false);

      document.addEventListener('dragleave', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (this.compressing) {
          return;
        }
        this.clearBackData();
        this.hover = false;
      }, false);

      ipcRenderer.on('getFileDataRepay', (event, arg) => {
        this.compressing = false;
        if (arg.code === 0) {
          this.backData = arg.data;
          this.$nextTick(() => {
            this.showCirclePie(arg.data.oldSize, arg.data.newSize);
          });
        } else {
          this.$Message({
            type: 'error',
            message: arg.msg,
            position: 'centertop'
          });
        }
      });
    },

    methods: {
      downloadImg () {
        ipcRenderer.send('getCompressFileData');
      },
      getIcon () {
        if (!this.compressing) {
          if (this.hover) {
            return 'collection-image';
          }
          return 'cloud-upload';
        }
        return 'swap-vertical';
      },

      showCirclePie (oldSize, newSize) {
        const deg = parseInt(((oldSize - newSize) / oldSize) * 360);
        new CirclePie('drawing', {
          diameter: 130,
          inColor: '#f2f2f2',
          inWidth: 10,
          outColor: '#B9E575',
          outWidth: 20,
          fontColor: '#B9E575',
          fontSize: 24,
          deg: deg
        });
      },
      clearBackData () {
        this.backData = {};
      },
      checkImageType (file) {
        const type = file.type;
        const typeList = ['image/png', 'image/vnd.microsoft.icon', 'image/jpeg', 'image/gif'];
        return typeList.indexOf(type) !== -1;
      },

      sendFile (file) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = (e) => {
          this.compressing = true;
          ipcRenderer.send('getFileData', {
            name: file.name,
            size: file.size,
            type: file.type,
            data: e.target.result
          });
        };
      },

      uploadImage (file) {
        if (this.checkImageType(file)) {
          this.sendFile(file);
          // ipcRenderer.send('getFileData', file);
        } else {
          this.$Message({
            type: 'error',
            message: '文件格式错误，暂时只支持图片压缩',
            position: 'centertop'
          });
        }
      }
    }
  }
</script>