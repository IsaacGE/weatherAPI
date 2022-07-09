/**
 * @format
 */

import {AppRegistry} from 'react-native';
import weatherAPI from './components/weatherAPI';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => weatherAPI);
