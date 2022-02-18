import axios from 'axios'

const tokenEl = document.getElementsByName('csrf-token')[0]
if (tokenEl) {
  const token = tokenEl.getAttribute('content')
  axios.defaults.headers.common['X-CSRF-Token'] = token
}
axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/json'

const client = axios.create({
    baseURL: 'http://localhost:10000/v1/client',
    timeout: 20000
  })
  
  let result = await client.get('/fetchMeSomething', {
    onDownloadProgress: progressEvent => {
      const total = parseFloat(progressEvent.currentTarget.responseHeaders['Content-Length'])
      const current = progressEvent.currentTarget.response.length
  
      let percentCompleted = Math.floor(current / total * 100)
      console.log('completed: ', percentCompleted)
    }
  })
  .then(res => {
    console.log("All DONE: ", res.headers)
    return res.data
  })

  class ProgressRing extends React.Component {
    constructor(props) {
      super(props);
  
      const { radius, stroke } = this.props;
  
      this.normalizedRadius = radius - stroke * 2;
      this.circumference = this.normalizedRadius * 2 * Math.PI;
    }
  }

    const { radius, stroke, progress } = this.props;
    const strokeDashoffset = this.circumference - progress / 100 * this.circumference;
  
    return (
      <svg
        height={radius * 2}
        width={radius * 2}
        >
        <circle
          stroke="white"
          fill="transparent"
          strokeWidth={ stroke }
          strokeDasharray={ this.circumference + ' ' + this.circumference }
          style={ { strokeDashoffset } }
          stroke-width={ stroke }
          r={ this.normalizedRadius }
          cx={ radius }
          cy={ radius }
          />
      </svg>
    );
 