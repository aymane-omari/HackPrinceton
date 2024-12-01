# SustainAI: Your Personal Guide to Sustainable Living

## Inspiration
Climate change and environmental degradation stand as some of the most critical challenges of our era. The enormity of these issues often leaves individuals feeling powerless, questioning how their personal choices could possibly effect meaningful change. The inspiration behind **SustainAI** stemmed from this very conundrum. We aspired to create a solution that bridges the gap between awareness and action, empowering individuals to make sustainable choices in their daily lives—choices that collectively contribute to a healthier planet.

## What It Does

**SustainAI** is an AI-powered web application designed to serve as your personal sustainability assistant. Through an interactive chatbot interface, users receive personalized recommendations on how to reduce their environmental impact. Whether it's suggesting energy-saving habits, recommending eco-friendly products, or providing sustainable transportation options, SustainAI tailors its advice to fit each user's unique lifestyle.
But our platform goes beyond general suggestions. With user permission, SustainAI integrates data from health apps, purchase histories, and transportation methods. This integration allows the app to offer highly customized advice—like encouraging more walking based on your activity levels, or suggesting sustainable alternatives to frequently purchased items. Users can accept suggested actions, track their progress, and build streaks to stay motivated. Additionally, the platform features a rich library of educational content on sustainability topics, helping users deepen their understanding and commitment to eco-friendly living.

## How We Built It
Creating SustainAI was a collaborative effort that blended multiple technologies into a seamless user experience. On the frontend, we utilized **React** to build a responsive and intuitive user interface, complemented by **Tailwind CSS** for efficient styling. This combination allowed us to create an application that is both aesthetically pleasing and user-friendly.
Our backend is powered by **Node.js** and **Express.js**, handling API requests and integrating with external services. We chose **MongoDB Atlas** for our database due to its scalability and flexibility, ensuring that user data, chat histories, and action tracking are stored securely.
A key component of SustainAI is our AI integration. Leveraging the **OpenAI GPT-3.5-Turbo API**, we developed an intelligent chatbot capable of understanding user inputs and generating meaningful, personalized responses. This allows users to engage in natural conversations and receive tailored sustainability advice in real-time.

### MATLAB and WAD File Conversion
One of the unique challenges we encountered was integrating data from various sources, particularly when dealing with complex file formats. Many health apps provide activity data in **WAD (Walk Activity Data)** files, which are not readily usable in their native binary format. To harness this valuable data, we turned to **MATLAB**, a powerful tool for numerical computing and data analysis.
Using MATLAB, we developed scripts to convert WAD files into structured text data. This process was crucial for several reasons. Firstly, it allowed us to make previously inaccessible data usable within our application. By converting the binary WAD files into readable text formats like CSV or JSON, we could parse and analyze users' walking activity data effectively.
The conversion process involved reading the binary data within WAD files and interpreting the specific structure used to record walking activities. Our MATLAB scripts extracted relevant information such as timestamps, step counts, distances walked, and other metadata. This data was then formatted into structured text files, which could be easily imported into our application's database.
Integrating this data into SustainAI enabled us to provide highly personalized recommendations. For instance, if the data indicated that a user had a low level of physical activity, the app might suggest incorporating more walking into their daily routine as a sustainable transportation option. Conversely, for users who already walk frequently, we could offer advice on maximizing the environmental benefits of their activities.
Automating this conversion process with MATLAB not only saved time but also ensured that we could handle large volumes of data efficiently as our user base grows. It allowed us to offer users real-time insights based on their most recent activity data, enhancing the overall effectiveness of our sustainability recommendations.

## Challenges We Ran Into
Integrating the AI chatbot presented one of the most significant challenges. Ensuring that the chatbot could engage users naturally while providing valuable and actionable sustainability suggestions required extensive fine-tuning and testing. We had to iterate on the AI's conversational models to balance informative responses with an engaging user experience.
Data integration posed another hurdle. Navigating the different APIs of health and finance apps, managing permissions, and ensuring data privacy demanded meticulous planning and implementation. Processing WAD files was particularly challenging due to their complex binary format. Developing reliable MATLAB scripts to accurately convert these files into usable data was time-consuming but ultimately rewarding.
Time constraints inherent in hackathon projects also tested our team's ability to prioritize features and work efficiently. Balancing ambition with practicality, we focused on delivering a functional and impactful application within the given timeframe.

## Accomplishments That We're Proud Of
We take pride in the effective integration of AI, creating a chatbot that delivers personalized, actionable sustainability advice in real-time. Overcoming the technical challenge of processing WAD files using MATLAB was a significant achievement, enabling us to enhanced personalization through detailed activity data.
Implementing user engagement features like the streak system and action tracking helped motivate users and encourage long-term commitment to sustainable practices. We are also proud of our commitment to ethical data handling, developing secure data integration methods that respect user privacy and comply with ethical standards.
Most importantly, our team's collaboration was exemplary. By leveraging each member's strengths, we brought SustainAI to life within the hackathon timeframe, demonstrating what can be achieved through dedicated teamwork.

## What We Learned
This project was a profound learning experience on multiple fronts. We deepened our understanding of AI development, particularly in natural language processing and its practical applications in enhancing user experiences. Our work with MATLAB and the processing of WAD files expanded our data analysis skills, teaching us advanced techniques for handling and converting complex data formats.
Building a complete application from frontend to backend strengthened our technical skills in web development, while our emphasis on user-centered design underscored the importance of intuitive interfaces and personalized content in driving engagement. Finally, the challenges we faced reinforced the value of effective project management, teaching us to coordinate tasks, manage time efficiently, and adapt to unforeseen obstacles.

## What's Next for SustainAI
Looking ahead, we're excited about the future possibilities for SustainAI. We plan to develop native mobile applications for iOS and Android, making our platform even more accessible. Enhancing personalization through advanced machine learning algorithms will allow us to refine our sustainability suggestions based on user interactions and preferences.
We aim to foster a supportive network of users by introducing community engagement features like challenges, leaderboards, and social sharing. Adding voice assistant capabilities is also on our roadmap, providing hands-free interaction and improving accessibility for all users.
Expanding our content and resources to support sustainability efforts worldwide is another key goal. By collaborating with international organizations, we hope to contribute to global environmental initiatives. Additionally, we plan to further leverage MATLAB and other data analysis tools to extract deeper insights from user data, enhancing the effectiveness of our recommendations.