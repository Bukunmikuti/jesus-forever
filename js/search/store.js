

const store = new Vuex.Store({
	state: {
  count: 0,
  bottomBar: false,
  loading: false,
  typed: '', 
  version: {
  	id: 'de4e12af7f28f599-01', 
  	name: 'King James Version', 
  	abbreviation: 'KJV'
  }, 
  object: [
  	/*
  	{
  		ref: '1 Timothy 1:17',
				version: 'KJV',
				apiBook: '1TI.1.17',
				refData: {
					book: '1 Timothy', 
					chapter: 1,
					startVerse: 17,
					endVerse: undefined, 
				}, 
				text: ['Jesus is LORD', 'Hallelujah']
			}
			*/
  ], 
  saves: [
  /* {<ref> <apiBook> <object.version☝️> <text>} */
  ]
 },
 
 mutations: {
 	INCREMENT (state) {
   state.count++
  }, 
  
  UPDATE_TYPED (state, value) {
   state.typed = value;
  }, 
  
  SHOW_BOTTOM_BAR (state, opt) {
  	state.bottomBar = opt
  }, 
  
  SHOW_LOADING (state, opt) {
  	state.loading = opt
  }, 
  
  CHANGE_VERSION (state, opt) {
  	state.version = opt;
  }, 
  
  ADD_TO_BIBLE (state, opt) {
  	state.object.unshift(opt);
  }, 
  
  REMOVE_FROM_BIBLE (state, index) {
  	state.object.splice(index, 1);
  }, 
  
  ADD_TO_SAVES (state, save) {
  	state.saves.push(save);
  }, 
 
  REMOVE_FROM_SAVES (state, index) {
  	state.saves.splice(index, 1);
  }, 
  
  REMOVE_ALL_SAVES (state) {
  	state.saves = [];
  }
 }, 
 
 actions: {
 	displayBible ({commit, state}, bibleData) {
 		let old = state.object;
 		// new = bibleData
 		let addedDiff = bibleData.filter(x => !old.includes(x));
 		let removeDiff = old.filter(x => !bibleData.includes(x));
 	
 		if (addedDiff.length > 0) {
 			addedDiff.forEach(e => {
 				commit('ADD_TO_BIBLE', e)
 			})
 		}
 	
 		//state.object = bibleData;
 		if (removeDiff.length > 0) {
 			removeDiff.forEach(e => {
 				let index = state.object.indexOf(e);
 				commit('REMOVE_FROM_BIBLE', index)
 			})
 		}
 	}
 }
})

export default store;
