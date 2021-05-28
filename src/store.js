import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        role: '药师', //患者、医生、药师、财务
        name: '黄松',
        gender: '男',
        userID: '',
        birthday: '1999-5-18',
        //患者专有状态
        ifBooking: '1',
        bookingType: '普通门诊',
        bookingOffice: '泌尿内科',
        bookingSpecialist: '',
        bookingTime: '2020-12-29',
        //病历id
        docId: '',


        /////////////
    },
    mutations: {

    },
    actions: {

    }
})