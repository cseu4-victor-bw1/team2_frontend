const herokuBaseURL = "http://rodrigo-mud.herokuapp.com/api/";
const localhostBaseURL = "http://127.0.0.1:8000/api/";

// this allows react to figure out
// whether to use local or heroku URL for the calls to the API
export default function withBaseURL(endpoint) {
	console.log(process.env.NODE_ENV);

	return process.env.NODE_ENV === "production"
		? herokuBaseURL
		: localhostBaseURL;
}
