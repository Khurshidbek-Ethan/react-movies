import { useParams } from 'react-router-dom'

const DetailedPage = () => {
	// useParamsda objectni olvolamiz bu bizga browserdagi paramsni qolga olib beradi
	const { movieId } = useParams()
	console.log(movieId)

	return <div>DetailedPage</div>
}

export default DetailedPage
