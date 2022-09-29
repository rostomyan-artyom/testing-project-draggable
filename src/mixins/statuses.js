import STATUSES_ICONS from '@/utils/contstants/statuses';

export default {
  methods: {
    getStatuses(statuses) {
      if(!Array.isArray(statuses)) return;

      return statuses.reduce((acc, item) => {
        Object.entries(STATUSES_ICONS).forEach(statusItem => {
          if(item === statusItem[0]) {
            acc.push(statusItem[1]);
          }
        })

        return acc;
      }, [])
    },
  }
}
