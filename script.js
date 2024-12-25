const APIURL = "https://api.github.com/users/";

export function giveMeData(username) { 
    axios.get(`${APIURL}${username}`) 
        .then(response => { 
            console.log("State: fulfilled"); 
            const info = response.data; 
            return axios.get(`${APIURL}${username}/repos`)
                .then(reposResponse => { 
                    const repos = reposResponse.data; 
                    console.log("Repos Recieved"); 
                    const recentReposName = getRecentRepos(repos); 
                    provideInformation(info, recentReposName); 
                }); 
            }) 
        .catch(error => { 
            console.log ("State: rejected");
            giveErrorMessage(); 
            }); 
        }

export let mainSection = document.getElementById('main');

function giveErrorMessage() {
    let notFound = document.createElement('div')
        notFound.className = 'card'
        notFound.innerHTML =
            `<p>No profile with this user name</p>`
    mainSection.appendChild(notFound)
}


function provideInformation(info, recentReposName) {
    let userCard = document.createElement('div')
    let avatar = info.avatar_url
    let fullName = info.name ? info.name : `${info.login} (username)`
    let biography = info.bio ? info.bio : ""; 
    let followersNumber = info.followers
    let followingNumber = info.following
    let repoNumber = info.public_repos
    let latestRepos = recentReposName

        userCard.className = 'card'
        userCard.innerHTML =
            `   <div>
                    <img class="avatar" alt="avatar" src="${avatar}">
                </div>
                <div class="user-info">
                    <h2>${fullName}</h2>
                    <p>${biography}</p>
                    <ul>
                        <li>${followersNumber} <strong>Followers</strong></li>
                        <li>${followingNumber} <strong>Following</strong></li>
                        <li>${repoNumber} <strong>Repos</strong></li>
                    </ul>
                    <span class="repo">${latestRepos[0]}</span> <span class="repo">${latestRepos[1]}</span> <span class="repo">${latestRepos[2]}</span> <span class="repo">${latestRepos[3]}</span> <span class="repo">${latestRepos[4]}</span> 
                </div>
            `
    mainSection.appendChild(userCard);
};

function getRecentRepos(repos) { 
    const sortedRepos = repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)); 
    let recentRepos = sortedRepos.slice(0, 5);
    let recentReposName = recentRepos.map(repo => repo.name);
    return recentReposName
} 
    
    
