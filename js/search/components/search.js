import welcomeCookies from './welcome-cookies.js';
import queryWrapper from './query-wrapper.js';
import resultWrapper from './result-wrapper.js';
import bottomBar from './bottom-bar.js';


const template = `
<welcome-cookies></welcome-cookies>
<query-wrapper></query-wrapper>
<result-wrapper></result-wrapper>
<bottom-bar></bottom-bar>
`

export default {
	template,
	components: {
		'welcome-cookies': welcomeCookies,
		'query-wrapper': queryWrapper,
		'result-wrapper': resultWrapper,
		'bottom-bar': bottomBar,
	},
	
}
