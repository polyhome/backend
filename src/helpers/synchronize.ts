import { Document, Model } from 'mongoose';

export async function synchronize<T extends Document>(
	model: Model<T>,
	newEntities: T[],
) {
	const updated = [];
	const created = [];

	let curEntities = await model.find({}).lean();
	curEntities = curEntities.map(m => m._id);

	newEntities.map(entity => {
		const index = curEntities.indexOf(entity._id);
		if (index >= 0) {
			updated.push(updateOne(entity, model));
			curEntities.splice(index, 1);
		} else {
			created.push(model.create(entity));
		}
	});

	// If a curEntity hasn't been updated, delete it from the database
	model.deleteMany({ _id: { $in: curEntities } }).then(() => {});
	return {
		// filter() ensures no 'null' values will be returned
		updated: (await Promise.all(updated)).filter(e => e),
		created: await Promise.all(created),
		deleted: curEntities,
	};
}

/**
 * @description - Updates a given Entity
 *
 * @param entity - Entity to update
 * @param model - Model of Entity
 */
function updateOne(entity: any, model: Model<any>) {
	if (entity.state) {
		delete entity.state;
	}

	return new Promise((resolve, reject) => {
		model
			.updateOne(
				{ _id: entity._id },
				{ $set: { ...entity } },
				{ strict: false, new: true },
			)
			.then(res => {
				res.nModified ? resolve(entity) : resolve(null);
			});
	});
}
