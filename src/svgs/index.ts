import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'

Vue.component(SvgIcon.name, SvgIcon)

const requireAll = (requireContext: IObject) => requireContext.keys().map(requireContext)
requireAll(require.context('./icons', false, /\.svg$/))
