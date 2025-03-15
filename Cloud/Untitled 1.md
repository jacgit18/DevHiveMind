Lab environment 
The lab environment provides you with the following resources to get started: an Amazon Virtual Private Cloud (Amazon VPC), the necessary underlying network structure, a security group allowing the HTTP protocol over port 80, an Amazon Elastic Compute Cloud (Amazon EC2) instance with the Amazon CLI installed, and an associated Amazon EC2 instance profile. The instance profile contains the permissions necessary to allow Session Manager, a capability of AWS Systems Manager, to access the Amazon EC2 instance. 
The following diagram shows the interactive flow of the AWS API for creating AWS services and resources used in the lab through the AWS Management Console and AWS CLI. 
 
AWS services not used in this lab 
AWS services not used in this lab are deactivated in the lab environment. In addition, the capabilities of the services used in this lab are limited to only what the lab requires. Expect errors when accessing other services or performing actions beyond those provided in this lab guide. 


Task 1: Explore and configure the AWS Management Console 
In this task, you explore the AWS Management Console and the unified search tool. You then configure the Region, widgets, and services. 
ⓘ Learn more: The AWS Management Console provides secure sign-in using your AWS account root user credentials or AWS Identity and Access Management (IAM) account credentials. When you first sign in, the user credentials are authenticated and the home page is displayed. The home page provides access to each service console and offers a single place to access the information you need to perform your AWS related tasks. For more information, see 
What is the AWS Management Console?
. 
Task 1.1: Choose an AWS Region 
In this task, you choose an AWS Region that specifies where your resources are managed. Regions are sets of AWS resources located in the same geographical area. 
3.
 On the navigation bar, choose the Region selector displayed at the top-right corner of the console, and then choose the Region to which you want to switch. 
The Region on the console home page is now changed to the Region you chose. 
! Caution: If the chosen Region opens up a different webpage instead of the console home page, choose Cancel and try to choose a different Region. 
Next, you configure the default Region. 
4.
 To open the General Settings page, click gear icon from menu bar. 
5.
 Click on More user settings. 
The Unified Settings page is displayed. 
6.
 In the Localization and default Region section, choose Edit. 
7.
 For Default Region, select any Region from the dropdown menu. 
8.
 Choose Save settings. 
A  Successfully updated localization and Region settings message is displayed on top of the screen. 
! Caution: If the current Region shown on the Region selector in the top-right corner is the same Region you choose in the default Region dropdown list, you will not see the success message with Go to new default Region. Try choosing a different Region from the dropdown menu to see this message and complete the next step. 
9.
 Choose Go to new default Region. 

The Unified Settings page is displayed with the Region set to the Default Region you chose. 
 Note: If you do not choose a default Region, the last Region you visited becomes your default. 
10.
 Choose the AWS logo displayed in the upper-left-hand corner to return to the console home page. 
11.
 On the navigation bar, choose the Region selector displayed at the top-right corner of the console, and then choose the Region that matches the LabRegion value located to the left of these instructions. 
! Caution: Verify that you are in the correct region that matches to the LabRegion value located to the left of these instructions. 
Task 1.2: Search with the AWS Management Console 
In this task, you explore the search box on the navigation bar, which provides a unified search tool for locating AWS services and features, service documentation, and the AWS Marketplace. 
12.
 To open a console for a service, go to the  Search box in the navigation bar of the AWS Management Console, and enter cloud. 
The more characters you type, the more the search refines your results. 
13.
 To narrow the results to the type of content that you want, choose one of the categories on the left navigation pane. 
14.
 To quickly navigate to a service or popular features of a service, in the Services section, hover over the AWS Cloud Map service name in the results and choose the link. 
The AWS Cloud Map console page is displayed. 
 Note: For more details about a documentation result or AWS Marketplace result, hover on the result title and choose a link. 
15.
 Choose the AWS logo displayed in the upper-left-hand corner to return to the console home page. 
Task 1.3: Add and remove favorites 
In this task, you explore the AWS Management Console to add AWS services to your Favorites list and remove added services from the Favorites list. 
Add a service to the list of favorites 
16.
 On the navigation bar, choose Services to open a full list of services. 
17.
 From the left navigation menu, choose All services or Recently visited, and then choose a service from the list that you want to add as a favorite. 

18.
 To the left of the service name, select the star. 
 Note: Repeat the previous step to add more services to your Favorites list. 
19.
 To view the list of favorite services, from the left navigation menu, choose Favorites. 
 Note: Alternatively, Favorites are pinned and visible on the navigation bar at the top of the console window. 
Remove a service from the list of favorites 
20.
 On the navigation bar, choose Services to open a full list of services. 
21.
 In the Favorites list, deselect the star next to the name of a service you wish to remove. 
 Note: Alternatively, in the Recently visited list or All services list, deselect the star next to the name of a service that is in your Favorites list. 
Task 1.4: Open a console for a service 
22.
 On the navigation bar, choose Services to open a full list of services. 
23.
 Choose a service under Favorites or Recently visited or All services to quickly navigate to a specific service. 
The chosen service console page is displayed. 
24.
 Choose the AWS logo displayed in the upper-left-hand corner to return to the AWS Management Console home page. 
Task 1.5: Create and use dashboard widgets 
In this task, you learn about the widgets that display important information about your AWS environment and provide shortcuts to your services. You can customize your experience by adding and removing widgets, rearranging them, or changing their size. 
25.
 To add a widget, choose + Add widgets. 
The Add widgets window is displayed. 
26.
 In the Add widgets menu, choose the title bar at the top of the widget that you want to add and then drag the widget on the console page. 
27.
 To rearrange a widget, configure the following: 
•
 Choose the title bar at the top of the widget, for example, Favorites, and then drag the widget to a new location on the console page. 
28.
 To resize a widget, configure the following: 

•
 Choose the Recently Visited widget. 
•
 Drag the bottom-right corner of the widget to resize. 
29.
 To remove a widget, configure the following: 
•
 Choose the Welcome to AWS widget. 
•
 In the upper-right corner of the widget, choose the widget actions ellipsis icon, represented by three vertical dots. 
•
 Choose Remove widget. 
 Congratulations! You have explored the AWS Management Console and learned to customize your console home screen.


Task 2: Create an Amazon S3 bucket using the AWS Management Console 
In this task, you create and configure a new Amazon S3 bucket in the LabRegion using the AWS Management Console. 
! Caution: Verify that you are in the correct region that matches to the LabRegion value located to the left of these instructions. 
ⓘ Learn more: Amazon S3 is an object storage service that offers industry-leading scalability, data availability, security, and performance. Customers can use Amazon S3 to store and protect any amount of data for a range of use cases, such as data lakes, websites, mobile applications, backup and restore, archive, enterprise applications, Internet of Things (IoT) devices, and big data analytics. For more information, see 
What is Amazon S3?
. 
 
30.
 On the Services menu, choose All Services. 
31.
 On the left navigation menu, scroll down the list and choose Storage. 
32.
 From the Storage list, choose S3. 
 Note: You can also search for S3 in the search bar  Search at the top of the console. 
33.
 In the navigation pane on the left-hand side of the console, choose Buckets. 
34.
 Choose Create bucket. 
The Create bucket page is displayed. 
35.
 In the General configuration section, for Bucket name, enter labbucket-NUMBER. 
 Note: Replace NUMBER in the bucket name with a random number. This ensures that you have a unique name. 
•
 Example bucket name: labbucket-987987 
 Note: Amazon S3 bucket names must be globally unique and Domain Name System (DNS) compliant.


36.
 The AWS Region should match the LabRegion value found to the left of these lab instructions. 
37.
 Leave all other settings on this page as the default configurations. 
38.
 Choose Create bucket at the bottom of the screen. 
 In terms of implementation, you can create a bucket using the Amazon S3 API, but you performed the same operation using the Amazon S3 console instead. The console uses the Amazon S3 APIs to send requests to Amazon S3. 
A  Successfully created bucket &quot;labbucket-xxxxx&quot; message is displayed on top of the screen. 
The S3 console is displayed. The newly created bucket is displayed among the list of all the buckets for the account. 
 Congratulations! You have created a new Amazon S3 bucket with the default configura