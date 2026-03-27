import { useParams } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import useRepository from '../hooks/useRepository.js';

const RepositoryContainer = () => {
    const { id } = useParams();
    const { repository, loading } = useRepository(id)

    if (loading) return null;

    return <RepositoryItem item={repository} singleView />;
};

export default RepositoryContainer;