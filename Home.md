
---
cssclass: dashboard
banner: "![[Hive Banner.gif]]"
banner_y: 0.494
banner_x: 0.5
dg-home: true
dg-publish: true

---
<div class="title" style="color:#FFC300"; text-shadow: 0 0 10px rgba(255, 195, 0, 0.8);>Hive Mind Dashboard</div>

<button onclick="window.location.href='obsidian://open?vault=DevBrain&page=%5B%5B_Architecture%20Dashboard%5D%5D'">Architecture Dashboard</button>

[[_Architecture Dashboard]]


#todo/Low/Dev 
- [ ] Fix button so you don't need backlink
- [ ] Create dashboard for other folders using dataview queries.

### To Access Full Vault
[Join the Hive](https://docs.google.com/forms/d/e/1FAIpQLSc-NvwAUS2e3dndizHwgbqrldnfTFBD74E_zAIPJtd7fZyQjg/viewform)
# Vault Info


- 🔖 Tagged:  favorite 
 `$=dv.list(dv.pages('#favorite').sort(f=>f.file.name,"desc").limit(4).file.link)`
- 〽️ Stats
	-  File Count: `$=dv.pages().length`
	

- 🗄️ Recent file updates
 `$=dv.list(dv.pages('').sort(f=>f.file.mtime.ts,"desc").limit(11).file.link)`


# The List
- 💻 Dev Quest
	- [ ] [[Dev Roadmaps By Priority#Main Long Quest | Main Quest]]
	- [ ] [[Dev Roadmaps By Priority#New Path | New Path of Exploration]]
	- [ ] [[Dev Roadmaps By Priority#Side Quest Revist |  Side Quest]]

