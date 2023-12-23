# Fecth function

## Get request

```JS
fetch("url")
    .then(res => {
        if (res.ok) { // check if status code is in 2[0-9][0-9]
            console.log("success")
        } else {
            console.log("error");
        }
        res.json() 
        })
    .then(data => console.log(data))
    .catch(err => console.log('Error', err));
```

## Post request

```JS
fetch("url", {
    method : 'POST',
    header: {
        'Content-Type' : 'application/json'
    }
    body : JSON.stringify({
        name: "My Name",
    })
})
    .then(res => {
        return res.json()
    })
    .then(data => console.log(data))
    .catch(err => console.log('Error', err));
```