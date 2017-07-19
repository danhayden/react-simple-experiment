import {configure} from '@storybook/react'

function loadStories() {
  const storyFiles = require.context('../src/', true, /\.stories\.js$/)
  storyFiles.keys().forEach(filename => storyFiles(filename))
}

configure(loadStories, module)
