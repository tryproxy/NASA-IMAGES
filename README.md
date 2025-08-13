# NASA IMAGES (SPA)

[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff)](https://vitejs.dev/) [![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=000)](https://react.dev/) [![React Router](https://img.shields.io/badge/React%20Router-CA4245?logo=react-router&logoColor=fff)](https://reactrouter.com/) [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=fff)](https://tailwindcss.com/) [![Zustand](https://img.shields.io/badge/Zustand-FF7E29)](https://zustand-demo.pmnd.rs/) [![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?logo=react-query&logoColor=fff)](https://tanstack.com/query) [![Vitest](https://img.shields.io/badge/Vitest-6E9F18?logo=vitest&logoColor=fff)](https://vitest.dev/) [![FSD](https://img.shields.io/badge/FSD-Feature--Sliced%20Design-8A2BE2)](https://feature-sliced.design/)

This app searches and displays images (and videos - TBD) from nasa’s image and video library

## todo

- [ ] video support
- [ ] improve search with live results, debounce, and quick suggestions
- [ ] infinite scroll
- [ ] modal view for full-size images and with video playback support
- [ ] user auth and profile page
- [ ] boards/collections feature for saved assets
- [ ] masonry grid
- [ ] responsive design

**api**
[NASA image and video library API docs (pdf)](https://images.nasa.gov/docs/images.nasa.gov_api_docs.pdf)

## instructions

1. `git clone <repo>` – clone
2. `git switch spa-build` – switch
3. `npm i` – install

## notes

- `package-lock.json` is kept, but if installing or building issues happen, remove `-lock.json` and reinstall

## scripts

- `npm run dev` – start dev server
- `npm run build` – production build
- `npm run preview` – preview build
- `npm run lint` – lint code
- `npm run test` – run tests
