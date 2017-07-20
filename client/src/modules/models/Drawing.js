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

  static save(data){
    if (data.id){ // ID exists,
      return axios.put(BASE_SERVER_URL + MODEL_PATH + '/' + data.id, data)
        .then(res => {
          return res.data;
        });
    } else { // no ID, create a new object.
      return axios.post(BASE_SERVER_URL + MODEL_PATH, data)
        .then(res => {
          return res.data;
        });
    }


  }

}

export default Drawing;
