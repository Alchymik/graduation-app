import { createStore } from 'vuex'
import { supabase } from '@/supabase'

export default createStore({
  strict: true,

  state: {
    session: {},
    showDialogWindowType: '',
    dialogComponentsProps: {}
  },

  mutations: {
    setSession(state, value) {
      state.session = value;
    },
    setShowDialogWindowType(state, value) {
      state.showDialogWindowType = value;
    },
    setDialogComponentsProps(state, value) {
      state.dialogComponentsProps = value;
    },
  },

  actions: {
    async getSession({ commit }) {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        commit('setSession', data.session);
      } catch (error) {
        alert(error.error_description || error.message);
      }
    },
  }
})

/*users: [
    {id, email}
  ],
  shared_users: [
    {id(users), id(projects)}
  ]
  projects: [
    {id, user_id, title, state, methoda}
  ],

  tables: {
    {id, project_id, scrum_backlog_flag}
  },

  columns: [
    {id, table_id, name}
  ],

  tasks: [
    {id, column_id, name, details, tag, end_date}
  ]
} */