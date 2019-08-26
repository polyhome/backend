describe('BoardIndex', () => {
	it('should import BoardModule', async () => {
		const { BoardModule } = await import('../');
		expect(BoardModule).toBeTruthy();
	});

	it('should import BoardService', async () => {
		const { BoardService } = await import('../');
		expect(BoardService).toBeTruthy();
	});

	it('should import BoardSchema', async () => {
		const { BoardSchema } = await import('../');
		expect(BoardSchema).toBeTruthy();
	});
});
