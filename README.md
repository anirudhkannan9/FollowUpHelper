Roadmap:
- Create a label for the list of saved/added people, so that the screenshot here is clearer: https://anirudhk.gumroad.com/l/coldemailhelper. Right now it's unclear why it goes from "Save this URL/why do you want to connect with this person" to a random person on Twitter

- Save the text that I was typing if I click off the extension for a moment (e.g. to open a new tab)

- Make links in note bodies clickable

- Delete someone from the list by pressing '-' (including a confirmation dialog)
- Edit the note by clicking a pencil icon

- Share via email so that if I come across someone on LinkedIn iOS app, I can press share --> GMail --> send to an email address --> it gets saved in the list.
- Add to above feature: If I send a profile to this email, it just saves the profile. If I send a post, it extracts the profile and puts the post link and/or summary in the notes

- Filtering display of saved/added people. Two rows of filters. Row 1 has to do with status: "Sent/Waiting," "Active". Row 2 has to do with platforms: "All" "LinkedIn" etc.
 
- Add a Loom about how to use this Chrome Extension to this README file. Order of Loom: Use case / why & how I use this (30-60s), then installation instructions.
- Google Form or something for people to submit suggestions / bugs 


Distant roadmap:
- Instead of saving data to JSON (and reloading data from JSON), some kind of account management functionality?
- Reminders: "it's been x days/weeks since you added X. Do you want to follow up with them?"
- Email follow-up support. Every time you send an email, you can activate the extension and it will note the email you sent from, the recipient address, the date & time, and the subject line. It can remind you to follow-up if they haven't replied (this could be more complicated though -- it might need them to let the extension access their email somehow)

Changelog/added functionality (not exhaustive):
- Dialog automatically pops up upon LinkedIn connection request being sent.
- Manual adding of URLs for people who you want to save / follow-up with
- Backup & restoration of data via JSON.
- Saved JSONs are saved with some keyword e.g. followuphelper backup so that it's easy for you to find
- Next to the text field for URL for manual input, button to "Add current page URL"
