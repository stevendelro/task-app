export const tasks = [
  {
    _id: '60d39909a4f6eb8d2556fe12',
    author: 'Steven',
    tasktitle: 'This is a sample title',
    details: `The click event of the nested action will propagate up and expand
            the accordion unless you explicitly stop it.`,
    priority: {
      primary: {
        level: 'Urgent',
        value: 3,
      },
      secondary: {
        importance: 'More',
        value: 2,
      },
    },
    completed: false,
    tags: ['workout', 'home', 'fitness'],
  },
  {
    _id: '60d39909a4f6eb8d2556fe13',
    author: 'Steven',
    tasktitle: 'Title for another',
    details: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam`,
    priority: {
      primary: {
        level: 'High',
        value: 2,
      },
      secondary: {
        importance: 'Less',
        value: 1,
      },
    },
    completed: true,
    tags: ['home', 'fitness'],
  },
  {
    _id: '60d39909a4f6eb8d2556fe14',
    author: 'Steven',
    tasktitle: 'What is a title',
    details: `Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur`,
    priority: {
      primary: {
        level: 'Low',
        value: 1,
      },
      secondary: {
        importance: 'High',
        value: 2,
      },
    },
    completed: false,
    tags: ['fitness'],
  },
];
