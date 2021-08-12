import CodeCell from '../components/CodeCell';
import TextEditor from '../components/TextEditor';
import { Provider } from 'react-redux';
import { store } from './store';
const App = () => {
  return (
    <Provider store={store}>
      <div>
        <TextEditor />
        <CodeCell />
      </div>
    </Provider>
  );
};
export default App;
