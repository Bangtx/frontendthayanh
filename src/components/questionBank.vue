<template>
  <div class="list">
    <div class="topic">
      <div><span>Topic:</span></div>
      <select v-on:click="event_select_search" v-model="topic_search">
        <option v-for="topic in all_topic" :key="topic[0]" v-bind:value="topic[0]">{{ topic[1] }}</option>
      </select>
    </div>
    <div class="type">
      <div>Type:</div>
      <select>
        <option>Multiple-Choice</option>
        <option>Long-Response</option>
      </select>
    </div>
    <div class="level">
      <div>Level:</div>
      <select>
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
      </select>
    </div>
    <div class="doc">
      <div>Doc:</div>
      <select v-on:click="event_select_search" v-model="document_search">
        <option v-for="document in all_document" :key="document[0]" v-bind:value="document[0]">{{
            document[1]
          }}
        </option>
      </select>
    </div>
    <!--      <QuestionBank-->
    <!--          v-on:change_src_image="change_src_image"-->
    <!--      />-->
    <div class="list-MSSV">
      <select multiple="multiple" style="width: 70%; margin: 0 auto">
        <option v-for="item in all_question_search" :key="item[0]" v-on:dblclick="change_src_image(item)">{{
            item[4]
          }}
        </option>
      </select>
    </div>
  </div>
  <div class="Image">
    <div class="show-image"><img id="myImage" v-bind:src="link_image"></div>
    <sent-result
        v-bind:isMultiChoice="isMultiChoice"
        v-bind:isLongResponse="isLongResponse"
        v-on:sentResult="sentResult"
        v-on:clickEventShowAnswer="clickEventShowAnswer"
    />
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { defineComponent } from '@vue/composition-api'
import SentResult from "@/components/sendResults.vue";
import axios from 'axios'

export default defineComponent({
  name: 'QuestionBank',
  props: {},
  components: {
    SentResult
  },
  setup(props, { emit} ) {
    const topic_search = ref(0)
    const document_search = ref(0)
    const isMultiChoice = ref(false)
    const isLongResponse = ref(false)
    const link_image = ref('aa')
    const all_data = ref([1, 4])
    const all_question_search = ref([0])
    // const id_question = ref('0')
    const all_topic = ref([''])
    const all_document = ref([''])
    const id_question = ref('0')
    const getdata = async () => {
      await axios.get('http://127.0.0.1:8000/data/', {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }
          }
      ).then(rs => {
        all_data.value = JSON.parse(rs.data)
        all_question_search.value = JSON.parse(JSON.stringify(all_data.value))
      })

      await axios.get('http://127.0.0.1:8000/topic', {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          }
          }
      ).then(rs => {
        all_topic.value = JSON.parse(rs.data)
      })

      await axios.get('http://127.0.0.1:8000/document', {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          }
          }
      ).then(rs => {
        all_document.value = JSON.parse(rs.data)
      })
    }
    getdata()
    const change_src_image = (data: any) => {
      const type = data[5]
      if (type === 'multi choice') {
        isMultiChoice.value = true
        isLongResponse.value = false
      }
      if (type === 'long response') {
        isMultiChoice.value = false
        isLongResponse.value = true
      }
      link_image.value = data[6]
      id_question.value = data[0]
    }

    const sentResult = async (result: any) => {
      console.log('sentResult', result)
      console.log('http://127.0.0.1:8000/' + '1/' + result + '/' + id_question.value)
      await axios.get('http://127.0.0.1:8000/receive/' + '1/' + result + '/' + id_question.value, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          }
        }
      )
    }

    const clickEventShowAnswer = () => {
      link_image.value = link_image.value.slice(0, -4) + 'M.png'
    }

    const event_select_search = () => {
      all_data.value = JSON.parse(JSON.stringify(all_data.value))
      all_question_search.value = []
      // console.log(document_search.value)
      all_data.value.forEach((element: any, index) => {
        if (element[2] == topic_search.value && element[3] == document_search.value) {
          all_question_search.value.push(element)
        }
      })
      console.log(all_question_search.value)
    }

    return {
      id_question,
      getdata,
      all_data,
      link_image,
      change_src_image,
      isMultiChoice,
      isLongResponse,
      sentResult,
      all_topic,
      all_document,
      event_select_search,
      topic_search,
      document_search,
      clickEventShowAnswer,
      all_question_search
    }
  }
})
</script>

<style>
.Image {
  width: 77.8%;
  height: 100vh;
  background-color: #fff;
}

.Image .show-image {
  width: 100%;
  height: 100vh;
  position: relative;
  /*background-color: red;*/
  float: left;
}

#myImage {
  width: 75%;
  max-height: 80vh;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  /*margin: 0 auto;*/
}

.Image .sentResult {
  width: 100%;
  height: 10vh;
  display: block;
  position: absolute;
  bottom: -10%;
  /*flex-direction: column-reverse;*/

  /*justify-content: center;*/
  /*align-items: center;*/
}
</style>
