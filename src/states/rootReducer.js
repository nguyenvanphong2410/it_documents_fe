import documentReducer from './modules/document';
import categoryReducer from './modules/category';

const rootReducer = {
  document: documentReducer,
  category: categoryReducer
}

export default rootReducer
