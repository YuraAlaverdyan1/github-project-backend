import { Octokit } from '@octokit/rest';

import { GIT_TOKENS } from '../../config/environments';
import logger from '../logger';

const octokit = new Octokit({
    auth: GIT_TOKENS.TOKEN
});

export const getCommitActivityForRepo = async (owner: string, repo: string) => {
    try {
        const response = await octokit.request('GET /repos/{owner}/{repo}/stats/commit_activity', {
            owner,
            repo,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });

        return response.data;
    } catch (error) {
        logger.error(`Failed to fetch commit activity for ${owner}/${repo}: ${error.message}`);
        return null;
    }
};