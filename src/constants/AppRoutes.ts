class AppRoutes {
  public static ANY = '*'

  public static BASE = '/'

  public static HOME = '/home'

  public static ABOUT = '/about'

  public static LOGIN = '/login'

  public static SIGNUP = '/signup'

  public static RECOVER_ACCESS = '/recover-access'

  public static USER_PROFILE = '/user/:id/profile'

  public static USER_PROFILE_EDIT = '/user/:id/profile/edit'

  public static STORY = '/story/:id'

  public static STORY_SHARED = '/story/shared'

  public static STORY_CREATE = '/story/create'

  public static STORY_EDIT = '/story/:id/edit'

  public static PRIVACY_POLICY = '/privacy-policy'
}

export { AppRoutes }
