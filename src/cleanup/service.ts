import TokenDatabaseService from "../database/tokens/service";

class CleanupService {
  static start(): void {
    const cleanup = async () => {
      try {
        const deleted = await TokenDatabaseService.deleteExpiredTokens();
        console.log(`Deleted ${deleted.count} expired tokens`);
      } catch (error) {
        console.error("Token cleanup failed:", error);
      }
    };

    void cleanup();

    setInterval(cleanup, 60 * 60 * 1000);
  }
}

export default CleanupService;
