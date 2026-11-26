import '@fontsource/italiana'
import '@fontsource/instrument-serif'
import '@fontsource/instrument-serif/400-italic.css'
import '@fontsource/hanken-grotesk/400.css'
import '@fontsource/hanken-grotesk/500.css'
import '@fontsource/hanken-grotesk/600.css'
import '@fontsource/dm-mono/400.css'
import '@fontsource/dm-mono/500.css'

import './styles/main.scss'

import { renderHeader, initStickyHeader } from './components/header'
import { renderFooter } from './components/footer'

renderHeader()
initStickyHeader()
renderFooter()
