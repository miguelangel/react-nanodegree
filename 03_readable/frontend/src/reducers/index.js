import { LOAD_POSTS, FILTER_POSTS_BY_CATEGORY, SORT_POSTS_BY } from '../actions'
import { SORTABLE_FIELDS } from '../components/SortPostsBy'

const initialPostsState = {
  posts: [],
  sortedBy: SORTABLE_FIELDS.timestamp
}

const posts = (state = initialPostsState, action) => {
  switch (action.type) {
    case LOAD_POSTS:
      // When loading posts, sort then by the initial sorting field (state.sortedBy)
      return {
        ...state,
        posts:action.posts.sort((a,b) => b[state.sortedBy] - a[state.sortedBy])
      };
    case SORT_POSTS_BY:
      return {
        ...state,
        posts: [...state.posts].sort((a,b) => b[action.field] - a[action.field])
      };
    case FILTER_POSTS_BY_CATEGORY:
      return {
        ... state,
        posts: state.posts.filter(post => post.category === action.category)
      };
    default:
      return state;
  }
}

export default posts;
