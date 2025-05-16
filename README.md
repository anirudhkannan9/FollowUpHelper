Roadmap:
- Be able to toggle it on/off easily (so if I'm using Nate's LI account it's off)
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

- Vlad's suggestion: Use AI to help you compose the outreach message based on your saved note.

- Readwise integration. Ideal functionality: let's say you save an article/highlight that mentions that company X was acquired in 2017. If you add someone on LinkedIn and they add you back, the AI model that helps you draft the outreach message to them should be able to tap into Readwise, see this info, and then be able to compose a message that says e.g. "Was just reading about the 2017 acquisition -- super interesting!"


Distant roadmap:
- Instead of saving data to JSON (and reloading data from JSON), some kind of account management functionality?
- Reminders: "it's been x days/weeks since you added X. Do you want to follow up with them?"
- Email follow-up support. Every time you send an email, you can activate the extension and it will note the email you sent from, the recipient address, the date & time, and the subject line. It can remind you to follow-up if they haven't replied (this could be more complicated though -- it might need them to let the extension access their email somehow)
- Semantic, LLM-enabled search, so that even if I misspell "Adam Robinson" or something when I'm searching (or when I added the note), it still can intuit that that's who I meant and connect me with what I'm searching for

Changelog/added functionality (not exhaustive):
- Dialog automatically pops up upon LinkedIn connection request being sent.
- Manual adding of URLs for people who you want to save / follow-up with
- Backup & restoration of data via JSON.
- Saved JSONs are saved with some keyword e.g. followuphelper backup so that it's easy for you to find
- Next to the text field for URL for manual input, button to "Add current page URL"
