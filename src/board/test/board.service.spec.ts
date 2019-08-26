import { mocked } from 'ts-jest/utils';
import { FileService } from '../../file/file.service';
import { MainService } from '../../main.service';
import { BoardService } from '../board.service';
jest.mock('../../main.service');

describe('BoardService', () => {
	let fileSvc: FileService;
	let boardSvc: BoardService;
	let mainSvcMock: any;

	beforeEach(() => {
		fileSvc = new FileService();
		boardSvc = new BoardService(fileSvc);
		mainSvcMock = mocked(MainService).mock.instances[0];
	});

	afterEach(() => {
		mocked(MainService).mockClear();
	});

	it('should be constructed', () => {
		expect(boardSvc).toBeTruthy();
	});

	it('should initialize', () => {
		boardSvc.init();
		expect(mainSvcMock.init).toHaveBeenCalledTimes(1);
	});

	it('should start watching files', () => {
		boardSvc.initFileWatch();
		expect(mainSvcMock.initFileWatch).toHaveBeenCalledTimes(1);
	});

	it('should return changeEvents', () => {
		const changeEvents = boardSvc.initFileWatch();
		expect(Object.keys(changeEvents)).toContain('updatedEvent');
		expect(Object.keys(changeEvents)).toContain('updatedEvent');
		expect(Object.keys(changeEvents)).toContain('createdEvent');
	});
});
