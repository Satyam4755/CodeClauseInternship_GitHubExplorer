
    async function searchGithub() {
      const username = document.getElementById("username").value.trim();
      if (!username) return alert("Please enter a username");

      // Clear previous results
      document.getElementById("profile").innerHTML = "";
      document.getElementById("repos").innerHTML = "";

      try {
        // Fetch profile
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        if (!userRes.ok) throw new Error("User not found");
        const userData = await userRes.json();
        document.getElementById("profile").style.display="block";
        document.getElementById("profile").innerHTML = `
          <h2>${userData.name || userData.login}</h2>
          <img src="${userData.avatar_url}" width="100" height="100" alt="Avatar" />
          <p>Followers: ${userData.followers} | Following: ${userData.following}</p>
          <p>Public Repos: ${userData.public_repos}</p>
          <p><a href="${userData.html_url}" target="_blank">View Profile</a></p>
        `;

        // Fetch repositories
        const reposRes = await fetch(userData.repos_url);
        const repos = await reposRes.json();

        repos.slice(0, 10).forEach(repo => {
          const repoCard = document.createElement("div");
          repoCard.className = "card";
          repoCard.innerHTML = `
            <h3>${repo.name}</h3>
            <p>${repo.description || "No description provided."}</p>
            <p>⭐ Stars: ${repo.stargazers_count} | 🍴 Forks: ${repo.forks_count}</p>
            <p><a href="${repo.html_url}" target="_blank">Visit Repo</a></p>
          `;
          document.getElementById("repos").appendChild(repoCard);
        });
      } catch (error) {
        alert("❌ Error: " + error.message);
      }
    }