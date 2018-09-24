import Reactotron from 'reactotron-react-js';
import { reactotronRedux } from 'reactotron-redux';

Reactotron.configure({ name: 'honugram' }) // we can use plugins here -- more on this later
    .use(reactotronRedux())
    .connect()

export default Reactotron;