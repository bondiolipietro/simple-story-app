import { ResponseStatus, Size } from '../types'

const storyPreview1 = {
  id: '1',
  info: {
    title: 'story 1',
    description: 'description',
    image: {
      id: '1',
      title: 'story preview image',
      url: 'https://images.unsplash.com/photo-1662103185262-b0b11b0f3008?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
      alt: 'cavalo',
    },
    authorId: '1',
    private: false,
    createdAt: '2022-08-29T08:15:30+03:00',
  },
  analytics: {
    views: 1,
  },
}

const storyPreview2 = {
  id: '2',
  info: {
    title:
      'story 2 large title and stuff bla bla. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce hendrerit ex vel nunc blandit pharetra. Aenean facilisis lorem at turpis tempor, vel gravida diam vestibulum. Etiam placerat lectus id ipsum viverra vehicula.',
    image: {
      id: '1',
      title: 'story preview image',
      url: 'https://images.unsplash.com/photo-1662103185262-b0b11b0f3008?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
      alt: 'cavalo',
    },
    authorId: '1',
    private: false,
    createdAt: '2022-08-28T08:15:30+03:00',
  },
  analytics: {
    views: 1,
  },
}

const storyPreview3 = {
  id: '3',
  info: {
    title: 'story 3 large title and stuff bla bla',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce hendrerit ex vel nunc blandit pharetra. Aenean facilisis lorem at turpis tempor, vel gravida diam vestibulum. Etiam placerat lectus id ipsum viverra vehicula.',
    image: {
      id: '1',
      title: 'story preview image',
      url: 'https://images.unsplash.com/photo-1662103185262-b0b11b0f3008?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
      alt: 'cavalo',
    },
    authorId: '1',
    private: false,
    createdAt: '2022-08-30T08:15:30+03:00',
  },
  analytics: {
    views: 1,
  },
}

export const testData = {
  story: {
    id: '1',
    frames: [
      {
        title: 'frame 1',
        content: [
          {
            content:
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
            images: [
              {
                id: '1',
                title: 'img titulo',
                url: 'https://cptstatic.s3.amazonaws.com/imagens/enviadas/materias/materia16043/caracteristicas-cavalos-saudaveis-artigos-cursos-cpt.jpg',
                alt: '',
                size: Size.MEDIUM,
              },
            ],
          },
        ],
        notes: ['note 1', 'note 2'],
      },
      {
        title: 'frame 2',
        content: [
          {
            content:
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the ',
            images: [
              {
                id: '1',
                title: 'img titulo',
                url: 'https://super.abril.com.br/wp-content/uploads/2022/07/SI_441_ORCL_potencia_site.jpg',
                alt: '',
                size: Size.MEDIUM,
              },
            ],
          },
        ],
        notes: ['note 1', 'note 2'],
      },
    ],
    info: {
      title: 'story 1',
      description: 'description',
      image: {
        id: '1',
        title: 'story preview image',
        url: 'https://images.unsplash.com/photo-1662103185262-b0b11b0f3008?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
        alt: 'cavalo',
      },
      authorId: '1',
      private: false,
      createdAt: '2022-08-27T08:15:30+03:00',
    },
    analytics: {
      views: 1,
    },
  },
  storyPreview: storyPreview1,
  storiesPreview: [
    storyPreview1,
    storyPreview2,
    storyPreview3,
    storyPreview3,
    storyPreview3,
    storyPreview3,
    storyPreview3,
    storyPreview3,
  ],
  user: {
    id: '1',
    name: 'Pietro Bondioli',
    nickname: 'pietro',
    description: 'description',
    email: 'pietrobondiolipessoal@gmail.com',
    secondaryEmail: 'pietrobondiolipessoal@gmail.com',
    avatar: {
      id: '1',
      title: 'avatar',
      url: 'https://cdn-icons-png.flaticon.com/512/4712/4712206.png',
      alt: 'avatar',
    },
  },
  userPreview: {
    id: '1',
    name: 'Pietro Bondioli',
    nickname: 'pietro',
    description: 'description',
    avatar: {
      id: '1',
      title: 'avatar',
      url: 'https://cdn-icons-png.flaticon.com/512/4712/4712206.png',
      alt: 'avatar',
    },
  },
  loginResponse: {
    authToken: 'token',
    userId: '1',
  },
  defaultError: {
    status: ResponseStatus.ERROR,
    message:
      'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum',
  },
}
