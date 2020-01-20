import * as $ from 'jquery';
import Post from '@models/Post';
import json from './assets/json';
import WebpackLogo from './assets/webpack-logo.png';
import './styles/styles.css';
import './styles/less.less';
import './styles/st.scss';
import xmlData from './assets/data.xml';
import csvData from './assets/data.csv';

const post = new Post('Webpack post title', WebpackLogo);

$('pre').addClass('code').html(post.toString());

// console.log(json);
// console.log('xml data', xmlData);
// console.log('csv data', csvData);