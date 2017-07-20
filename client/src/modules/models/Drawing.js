import axios from 'axios';

const BASE_SERVER_URL = 'http://localhost:1337/api/';
const MODEL_PATH = 'drawings';

class Drawing {

  static getAll(){
    return axios.get(BASE_SERVER_URL + MODEL_PATH)
      .then(res => {
        const drawings = res.data;
        return drawings;
      });

  }


}

export default Drawing;
