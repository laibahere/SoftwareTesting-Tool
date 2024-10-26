
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Software Testing Tool - README</title>
</head>
<body>

<h1>Software Testing Tool</h1>
<p>This project is a <strong>Software Testing Tool</strong> developed as part of a university assignment for UBIT, University of Karachi. The tool provides a user-friendly interface for creating, managing, and executing test cases, which helps in streamlining the testing process and improving software quality.</p>

<h2>Features</h2>
<ul>
    <li><strong>Test Case Management</strong>: Define and manage test cases with descriptions and expected outcomes.</li>
    <li><strong>Automated Testing Integration</strong>: Supports integration with automation tools.</li>
    <li><strong>Reporting</strong>: Generates reports to track test progress and analyze test results.</li>
    <li><strong>User Roles</strong>: Allows different access levels for team members (Admin, QA, Developer).</li>
</ul>

<h2>Technologies</h2>
<ul>
    <li><strong>Frontend</strong>: HTML, CSS, JavaScript</li>
    <li><strong>Backend</strong>: Node.js/Express</li>
    <li><strong>Database</strong>: MySQL/MongoDB for data management</li>
</ul>

<h2>Getting Started</h2>

<h3>Prerequisites</h3>
<p>Before running the application, make sure you have the following:</p>
<ol>
    <li><strong>Node.js and npm</strong>: Install <a href="https://nodejs.org/">Node.js</a>.</li>
    <li><strong>Database</strong>: Set up MySQL or MongoDB.</li>
</ol>

<h3>Setup Instructions</h3>
<ol>
    <li><strong>Clone the Repository</strong>:
        <pre><code>git clone &lt;repository-url&gt;</code></pre>
    </li>
    <li><strong>Install Dependencies</strong>:
        <pre><code>cd software-testing-tool<br>npm install</code></pre>
    </li>
    <li><strong>Set Up Environment Variables</strong>:
        <p>Create a <code>.env</code> file in the project folder and add database credentials:</p>
        <pre><code>DB_HOST=localhost<br>DB_USER=yourUsername<br>DB_PASS=yourPassword<br>DB_NAME=yourDatabaseName<br>PORT=3000</code></pre>
    </li>
    <li><strong>Initialize the Database</strong>:
        <pre><code>npm run db:init</code></pre>
    </li>
    <li><strong>Run the Application</strong>:
        <pre><code>npm start</code></pre>
    </li>
    <li><strong>Access the Tool</strong>: Open your browser and go to <code>http://localhost:3000</code>.</li>
</ol>

<h3>Running in VS Code</h3>
<ol>
    <li>Open the Project in VS Code.</li>
    <li>Go to the <strong>Run and Debug</strong> panel and create a <code>launch.json</code> file for Node.js:
        <pre><code>{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Run Software Testing Tool",
      "program": "${workspaceFolder}/index.js",
      "envFile": "${workspaceFolder}/.env"
    }
  ]
}</code></pre>
    </li>
    <li>Press <code>F5</code> to start debugging.</li>
</ol>

<h2>Future Enhancements</h2>
<ul>
    <li><strong>CI/CD Pipeline Integration</strong></li>
    <li><strong>Real-Time Collaboration</strong></li>
    <li><strong>Advanced Analytics</strong></li>
</ul>

<h2>License</h2>
<p>This project is licensed under the <a href="LICENSE">MIT License</a>.</p>

</body>
</html>
