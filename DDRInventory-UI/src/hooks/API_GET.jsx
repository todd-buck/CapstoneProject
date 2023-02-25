const base_url = "https://localhost:3000";

const API_GET = (api_method, setter=null) => {
    fetch(base_url + api_method)
        .then(res => res.json())
        .then(
            (result) => {
                if (setter != null)
                {
                    setter(result)
                }
            },
            (error) => {
                setter(null)
            }
        )
}

export default API_GET;