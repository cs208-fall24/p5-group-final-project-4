# Retrospective

- name: Hector Mendez-Garcia
- email: hectormendezgarc@u.boisestate.edu

## Experience

Working on this Egyptology website project provided valuable experience in full-stack web development. Throughout the development process, I gained extensive hands-on experience with frontend development by creating a responsive design using modern CSS techniques. The implementation of flexbox for the image gallery proved particularly educational, allowing me to understand how to create flexible and dynamic layouts. I focused on creating a cohesive Egyptian-themed color scheme using earth tones, which helped me develop an eye for design aesthetics and color theory in web development.

The frontend development phase involved implementing interactive elements with hover effects and animations for better user engagement. This experience deepened my understanding of CSS transitions and transformations, as well as the importance of user feedback in interface design. The development of a mobile-responsive layout with appropriate media queries taught me the crucial aspects of modern web development and the significance of creating websites that function well across all device sizes. Working with these responsive design principles has significantly improved my ability to create user-friendly interfaces.

On the backend, I gained valuable experience building a Node.js/Express server with proper routing and middleware configuration. The implementation of a SQLite database integration for persistent data storage enhanced my understanding of database management and data persistence in web applications. Creating RESTful API endpoints for comment functionality helped me grasp the principles of API design and server-client communication. The use of the Pug templating engine for server-side rendering introduced me to template engines and their role in modern web development, while the JavaScript implementation of a complete comment system with CRUD operations provided practical experience in full-stack feature development.

## Known issues or Bugs

The current implementation has several areas that could be improved in future iterations. The database implementation presents some concerns, particularly with the SQLite database running in-memory, which results in data loss when the server restarts. This temporary storage solution, while functional for development, isn't suitable for a production environment. Additionally, the lack of input sanitization and validation on the server side for comment submissions poses potential security risks that need to be addressed in future updates.

The comment system itself has several limitations that impact its scalability and user experience. The absence of pagination could become problematic as the number of comments grows, potentially affecting performance and usability. The missing timestamp display in the comment interface and the lack of a user authentication system for comment ownership limit the functionality and security of the feature. These issues highlight the need for a more robust comment management system that can handle larger amounts of data while maintaining security and user privacy.

From a frontend perspective, there are several technical constraints that could be improved to enhance the overall user experience. The fixed image dimensions (350px x 200px) might not provide optimal display for all image aspect ratios, potentially causing distortion or awkward cropping. The presence of hardcoded values in the CSS could be better managed through the use of CSS variables, which would improve maintainability and make theme adjustments more straightforward. These frontend limitations, while not critical, represent opportunities for improvement in future versions of the website.

## Sources used

Documentation:

    Express.js documentation: https://expressjs.com/
    SQLite3 documentation: https://www.sqlite.org/docs.html
    Mozilla Developer Network (MDN): https://developer.mozilla.org/
    Node.js documentation: https://nodejs.org/docs/
    Pug documentation: https://pugjs.org/

Technologies:

    Node.js (v18.x): https://nodejs.org/
    Express.js (v4.x): https://expressjs.com/
    SQLite3: https://www.sqlite.org/
    Pug templating engine: https://pugjs.org/
    Vanilla JavaScript (ES6+): https://developer.mozilla.org/en-US/docs/Web/JavaScript

CSS Resources:

    CSS-Tricks Flexbox Guide: https://css-tricks.com/snippets/css/a-guide-to-flexbox/
    MDN CSS Animations: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations
    Google Fonts: https://fonts.google.com/
    Color Adobe: https://color.adobe.com/
    CSS Grid Garden: https://cssgridgarden.com/
