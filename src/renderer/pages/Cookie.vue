<template>
  <div id="wrapper">
    <vs-row vs-justify="center">
      <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="6">
        <vs-card>
          <div slot="header">
            <h3>
              Cookie
            </h3>
          </div>
          <div>
            <span>Sử dụng cookie của bạn để đăng nhập và tự động làm các tác vụ facebook. Để lấy cookie bạn có thể tải plugin <a
                    href="#" @click="openLink('https://chrome.google.com/webstore/detail/editthiscookie/fngmhnnpilhplaeedifhccceomclgfbg/')">EditThisCookie</a> cho chrome hoặc một pligin tương tự khác.
            </span>
            <vs-divider></vs-divider>
            <vs-textarea label="Cookie của bạn" v-model="cookie"/>
          </div>
          <div slot="footer">
            <vs-row vs-justify="flex-end">
              <vs-button color="primary" @click="save()" :disabled="cookie === ''">Tiếp theo</vs-button>
            </vs-row>
          </div>
        </vs-card>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
  import Store from '../../lib/store'
  export default {
    data: function () {
      return {
        cookie: '',
        store: null
      }
    },
    methods: {
      save () {
        let store = new Store({
          configName: 'user-cookie',
          defaults: {
            cookie: ''
          }
        })
        store.set('cookie', this.cookie)
        this.$router.push('/home/dashboard')
      }
    },
    mounted () {
      this.store = new Store({
        configName: 'user-cookie',
        defaults: {
          cookie: ''
        }
      })
      this.cookie = this.store.get('cookie')
    }
  }
</script>

<style>
 #wrapper {
    margin-top: 120px;
 }
</style>
