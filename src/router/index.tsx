import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { AppConfig } from '../config/AppConfig'
import { AppRoutes } from '../constants/AppRoutes'
import { NotFound } from '../pages/NotFound'
import { Home } from '../pages/Home'
import { Login } from '../pages/Login'
import { About } from '../pages/About'
import { Signup } from '../pages/Signup'
import { RecoverAccess } from '../pages/RecoverAccess'
import { MyProfile } from '../pages/MyProfile'
import { MyProfileEdit } from '../pages/MyProfileEdit'
import { UserProfile } from '../pages/UserProfile'
import { Story } from '../pages/Story'
import { StoryCreate } from '../pages/StoryCreate'
import { StoryEdit } from '../pages/StoryEdit'
import { StoryShared } from '../pages/StoryShared'
import { PrivacyPolicy } from '../pages/PrivacyPolicy'
import { MyStories } from '../pages/MyStories'
import { HomeLayout } from '../components/HomeLayout'

function AppRouter() {
  return (
    <BrowserRouter basename={`${AppConfig.APP_BASE_PATH}`}>
      <Routes>
        <Route path={AppRoutes.ANY} element={<NotFound />}></Route>
        <Route path={AppRoutes.BASE} element={<Navigate to={AppRoutes.HOME} replace />}></Route>
        <Route element={<HomeLayout />}>
          <Route path={AppRoutes.HOME} element={<Home />}></Route>
          <Route path={AppRoutes.ABOUT} element={<About />}></Route>
          <Route path={AppRoutes.LOGIN} element={<Login />}></Route>
          <Route path={AppRoutes.SIGNUP} element={<Signup />}></Route>
          <Route path={AppRoutes.MY_STORIES} element={<MyStories />}></Route>
          <Route path={AppRoutes.MY_PROFILE} element={<MyProfile />}></Route>
          <Route path={AppRoutes.MY_PROFILE_EDIT} element={<MyProfileEdit />}></Route>
          <Route path={AppRoutes.RECOVER_ACCESS} element={<RecoverAccess />}></Route>
          <Route path={AppRoutes.USER_PROFILE} element={<UserProfile />} />
          <Route path={AppRoutes.STORY_CREATE} element={<StoryCreate />} />
          <Route path={AppRoutes.STORY_EDIT} element={<StoryEdit />} />
          <Route path={AppRoutes.PRIVACY_POLICY} element={<PrivacyPolicy />} />
        </Route>
        <Route path={AppRoutes.STORY} element={<Story />} />
        <Route path={AppRoutes.STORY_SHARED} element={<StoryShared />} />
      </Routes>
    </BrowserRouter>
  )
}

export { AppRouter }
