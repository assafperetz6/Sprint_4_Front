

//placeholder, not functional yet. need to refactor both local and remote

const { DEV, VITE_LOCAL } = import.meta.env

import { reviewService as local } from './discussion.service.local'
import { reviewService as remote } from './discussion.service.remote'

export const reviewService = VITE_LOCAL === 'true' ? local : remote

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.reviewService = reviewService
