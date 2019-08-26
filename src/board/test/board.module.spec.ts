import { BoardModule } from './../board.module';
describe('BoardModule', () => {
	let boardModule: BoardModule;

	beforeEach(() => {
		boardModule = new BoardModule();
	});

	it('should be constructed', () => {
		expect(boardModule).toBeTruthy();
	});
});
