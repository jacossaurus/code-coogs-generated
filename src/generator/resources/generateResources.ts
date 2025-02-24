import ts from "typescript";
import type { ResourceFile } from "../../types/resources";
import { createCommentStatement } from "../../utils/createCommentStatement";

async function generateResources(resources: Array<ResourceFile>) {
	console.log("Generating resources type file...");

	const statements = new Array<ts.Statement>();

	statements.push(
		createCommentStatement(
			" THIS FILE WAS GENERATED AUTOMATICALLY AND SHOULD NOT BE EDITED BY HAND!",
		),
	);

	statements.push(
		ts.factory.createInterfaceDeclaration(
			ts.factory.createModifiersFromModifierFlags(ts.ModifierFlags.Export),
			ts.factory.createIdentifier("Resource"),
			undefined,
			undefined,
			[
				ts.factory.createPropertySignature(
					undefined,
					ts.factory.createIdentifier("extension"),
					undefined,
					ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
				),
				ts.factory.createPropertySignature(
					undefined,
					ts.factory.createIdentifier("category"),
					undefined,
					ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
				),
				ts.factory.createPropertySignature(
					undefined,
					ts.factory.createIdentifier("name"),
					undefined,
					ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
				),
				ts.factory.createPropertySignature(
					undefined,
					ts.factory.createIdentifier("link"),
					undefined,
					ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
				),
				ts.factory.createPropertySignature(
					undefined,
					ts.factory.createIdentifier("id"),
					undefined,
					ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
				),
			],
		),
	);

	statements.push(
		ts.factory.createVariableStatement(
			ts.factory.createModifiersFromModifierFlags(ts.ModifierFlags.Export),
			ts.factory.createVariableDeclarationList(
				[
					ts.factory.createVariableDeclaration(
						ts.factory.createIdentifier("resources"),
						undefined,
						ts.factory.createArrayTypeNode(
							ts.factory.createTypeReferenceNode("Resource"),
						),
						ts.factory.createArrayLiteralExpression([
							...resources.map((resource) => {
								return ts.factory.createObjectLiteralExpression(
									[
										ts.factory.createPropertyAssignment(
											ts.factory.createIdentifier("id"),
											ts.factory.createStringLiteral(resource.id),
										),
										ts.factory.createPropertyAssignment(
											ts.factory.createIdentifier("link"),
											ts.factory.createStringLiteral(resource.link),
										),
										ts.factory.createPropertyAssignment(
											ts.factory.createIdentifier("name"),
											ts.factory.createStringLiteral(resource.name),
										),
										ts.factory.createPropertyAssignment(
											ts.factory.createIdentifier("category"),
											ts.factory.createStringLiteral(resource.category),
										),
										ts.factory.createPropertyAssignment(
											ts.factory.createIdentifier("extension"),
											ts.factory.createStringLiteral(resource.extension),
										),
									],
									true,
								);
							}),
						]),
					),
				],
				ts.NodeFlags.Const,
			),
		),
	);

	return ts.factory.createSourceFile(
		statements,
		ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
		ts.NodeFlags.None,
	);
}

export default generateResources;
