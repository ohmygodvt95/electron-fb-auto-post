<template>
    <vs-row>
        <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="7">
            <vs-tabs alignment="fixed">
                <vs-tab icon="dashboard" :label="`Groups URL (${list.length})`">
                    <div>
                        <vs-list>
                            <vs-list-header title="URLs" icon="format_list_bulleted"></vs-list-header>
                            <vs-list-item subtitle="Thêm group url mà bạn muốn auto post">
                                <vs-button icon="playlist_add" color="success" @click="popupActive = true" size="small">Thêm URL</vs-button>
                            </vs-list-item>
                            <vs-list-item v-for="(item, i) in list" :title="item.url" :key="i"
                                          :icon="item.state === 0 ? 'arrow_right' : (item.state === 1 ? 'refresh' : 'check')"
                                          :icon-pack="item.state === 2 ? 'material-icons fa-spin' : 'material-icons'"
                                          :class="item.state === 2 ? 'blinking' : (item.state === 3 ? 'success' : '')">
                                <vs-button radius @click="openLink(item.url)" icon="link" size="small" style="margin-right: 5px"></vs-button>
                                <vs-button radius color="danger" @click="deleteItem(i)" icon="close" size="small" title="Delete"></vs-button>
                            </vs-list-item>
                        </vs-list>
                        <vs-popup classContent="popup-example"  title="Thêm URL" :active.sync="popupActive">
                            <vs-input size="large" class="input" type="url" label-placeholder="facebook group URL" v-model="url" style="width: 100%!important;"/>
                            <br>
                            <vs-row vs-align="flex-start"
                                    vs-type="flex" vs-justify="center">
                                <vs-button @click="closePopup(popupActive = false)" color="primary" type="filled" icon="add_circle_outline">Thêm</vs-button>
                            </vs-row>
                        </vs-popup>
                    </div>
                </vs-tab>
                <vs-tab :label="`Post Content (${content.length})`" icon="speaker_notes">
                    <vs-row vs-align="flex-start"
                            vs-type="flex" vs-justify="center">
                        <vs-textarea label="Nội dung post" v-model="content" width="100%" rows="26"/>
                    </vs-row>
                </vs-tab>
            </vs-tabs>
        </vs-col>
        <vs-col vs-w="5" vs-align="center" vs-type="flex" vs-justify="center">
            <vs-button size="large" icon="play_arrow" @click="play()" v-if="!running">Start</vs-button>
            <vs-button size="large" icon="pause" v-else disabled color="danger">Running</vs-button>
        </vs-col>
    </vs-row>
</template>

<script>
  import Store from '../../../lib/store'
  import Crawler from '../../../lib/crawler'
  export default {
    data () {
      return {
        list: [],
        popupActive: false,
        url: '',
        content: '',
        running: false
      }
    },
    methods: {
      closePopup: function () {
        let regex = new RegExp('(https:\\/\\/)+[^\\s]+[\\w]')

        if (this.url.length > 0 && regex.test(this.url)) {
          this.list.unshift({
            url: this.url,
            state: 0
          })
          this.url = ''
          this.store.set('list', this.list)
        }
      },
      deleteItem: function (i) {
        this.list.splice(i, 1)
        this.store.set('list', this.list)
      },
      play: async function () {
        this.store.set('content', this.content)
        this.list.map(function (i) {
          i.state = 0
          return i
        })
        let r = confirm(`Bạn xác nhận sẽ gửi post(${this.content.length} kí tự) đến ${this.list.length} nhóm?`)
        if (r) {
          this.crawler()
        }
      },
      crawler: async function () {
        this.running = true
        let crawler = new Crawler(this.content, true)
        await crawler.createBrowser()
        if (await crawler.checkLogin()) {
          for (let [i, v] of this.list.entries()) {
            v.state = 1
            this.list[i].state = await crawler.run(v)
          }
        } else {
          alert('error')
        }
        await crawler.browser.close()
        this.running = false
      }
    },
    mounted () {
      this.store = new Store({
        configName: 'user-list',
        defaults: {
          list: [],
          content: ''
        }
      })
      this.list = this.store.get('list')
      this.content = this.store.get('content')
    }
  }
</script>

<style>
    .vs-list {
        height: 450px;
        overflow: scroll;
    }
    .fa-spin {
        -webkit-animation: fa-spin 2s infinite linear;
        animation: fa-spin 2s infinite linear;
    }
    .fa-pulse {
        -webkit-animation: fa-spin 1s infinite steps(8);
        animation: fa-spin 1s infinite steps(8);
    }
    @-webkit-keyframes fa-spin {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(359deg);
            transform: rotate(359deg);
        }
    }
    @keyframes fa-spin {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(359deg);
            transform: rotate(359deg);
        }
    }
    .success {
        color: #4BAF51;
    }
    .blinking{
        -webkit-animation:blinkingText 1.2s infinite;
        animation:blinkingText 1.2s infinite;
    }

    @keyframes blinkingText{
        0%{     color: #000;    }
        49%{    color: #000; }
        60%{    color: transparent; }
        99%{    color:transparent;  }
        100%{   color: #000;    }
    }
</style>
